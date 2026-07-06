"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildTargets } from "./pointTargets.js";

// Sky stars only — the build no longer forms particle outlines, so the
// whole cloud is the starfield (matching the old 18% visible of 20k).
const COUNT = 3600;

const VERT = /* glsl */ `
  attribute vec3 aScattered;
  attribute vec3 aSettled;
  attribute float aRand;
  uniform float uMorph1;   // build progress — the sky thins
  uniform float uMorph2;   // ship dispersal
  uniform float uBurst;    // spikes at the letter-slam: the sky flares
  uniform float uScroll;   // 0..1 master timeline progress (sky parallax)
  uniform float uWarp;     // signed scroll velocity — the sky streaks
  uniform float uTime;
  uniform vec2 uMouse;     // world-space px (smoothed in JS)
  uniform float uMouseActive;
  uniform float uDpr;
  varying float vAlpha;

  // Per-particle staggered, overshooting progress for the dispersal.
  float staggered(float p, float r) {
    float local = clamp((p - r * 0.35) / 0.65, 0.0, 1.0);
    float back = 1.70158;
    float t = local - 1.0;
    return t * t * ((back + 1.0) * t + back) + 1.0; // back.out
  }

  void main() {
    // Ch.3: the sky disperses outward past the viewport edges
    float p2 = staggered(uMorph2, fract(aRand * 7.31));
    vec3 pos = mix(aScattered, aSettled, p2);

    // ambient drift so the sky is never a still
    pos.x += sin(uTime * 0.22 + aRand * 6.2831) * 7.0;
    pos.y += cos(uTime * 0.19 + aRand * 12.566) * 7.0;

    // scroll parallax: the sky climbs far slower than the pinned foreground,
    // so the stars read as a distant background layer
    pos.y += uScroll * (90.0 + 70.0 * fract(aRand * 2.3));

    // velocity lag: under a hard scroll fling, each star trails the motion
    // by its own amount — the sky shears with inertia
    pos.y += uWarp * 26.0 * (fract(aRand * 3.3) - 0.5);

    // galaxy parallax: deeper stars shift more with the pointer, so moving
    // the mouse feels like drifting through the field
    pos.xy += uMouse * (pos.z * 0.00022) * uMouseActive;

    // local pointer interaction: nearby stars part around the cursor
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float push = smoothstep(220.0, 0.0, dist) * 60.0 * uMouseActive;
    pos.xy += normalize(d + 0.0001) * push;

    // stars near the pointer brighten softly
    float glow = smoothstep(260.0, 0.0, dist) * uMouseActive;

    // --- visibility -----------------------------------------------------
    float twinkle = 0.5 + 0.5 * sin(uTime * (0.6 + fract(aRand * 3.7) * 1.8) + aRand * 40.0);
    // the sky thins through the build: 60% of stars fade hard, the rest dim
    float fadeGroup = step(0.4, fract(aRand * 9.7));
    float thin = 1.0 - uMorph1 * (0.35 + 0.5 * fadeGroup);
    float alpha = (0.3 + 0.45 * twinkle) * thin + glow * 0.35;
    // the whole sky flares for a beat when the letters slam together
    alpha += uBurst * 0.35;
    // streaking stars dim a touch, like motion blur
    alpha *= 1.0 / (1.0 + abs(uWarp) * 0.5);
    // Ch.3: the sky disperses and dies away, revealing the backdrop
    alpha *= 1.0 - p2 * 0.88;
    vAlpha = min(alpha, 0.9);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    // orthographic camera: sizes are plain CSS pixels (times DPR).
    // The sprite grows under warp so the streak has room to draw.
    gl_PointSize = (1.0 + fract(aRand * 5.3) * 2.6)
      * (1.0 + uBurst * 0.5 + abs(uWarp) * 2.4) * uDpr * 0.8;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uAccent; // 0 = white dust, 1 = red-tinted ship state
  // highp to match the vertex stage — mediump here fails program validation
  uniform highp float uWarp; // scroll velocity — dots stretch into streaks
  uniform vec2 uResolution;
  varying float vAlpha;

  // Interleaved gradient noise — cheap dithering to prevent banding on the
  // dark canvas (spec: dark-on-dark over #0a0a0a bands without it).
  float ign(vec2 v) {
    return fract(52.9829189 * fract(dot(v, vec2(0.06711056, 0.00583715))));
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    // under warp the enlarged sprite narrows on x — a vertical light streak
    uv.x *= 1.0 + abs(uWarp) * 4.0;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * vAlpha;
    alpha -= ign(gl_FragCoord.xy) * 0.04; // dither
    vec3 white = vec3(0.92);
    vec3 red = vec3(0.69, 0.13, 0.13);
    gl_FragColor = vec4(mix(white, red, uAccent * 0.65), max(alpha, 0.0));
  }
`;

export default function HeroParticles({ glState, stageRef, skyIn = true, onFail }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      onFail?.();
      return;
    }
    if (!renderer.getContext()) {
      renderer.dispose();
      onFail?.();
      return;
    }

    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(parent.clientWidth, parent.clientHeight, false);

    const scene = new THREE.Scene();
    // Orthographic, 1 world unit == 1 CSS pixel, origin at canvas center.
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -2500, 2500);
    const fitCamera = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };
    fitCamera();

    const geo = new THREE.BufferGeometry();
    const setTargets = () => {
      const canvasBox = canvas.getBoundingClientRect();
      if (canvasBox.width === 0) return;
      // exploded targets are unused now (no wireframe) — pass a dummy rect
      const targets = buildTargets({
        count: COUNT,
        rects: [{ x: 0, y: 0, width: canvasBox.width, height: canvasBox.height, z: 0 }],
        viewport: { w: canvasBox.width, h: canvasBox.height },
        seed: 20260705,
      });
      // position attr is required by three but unused (vertex shader computes pos)
      geo.setAttribute("position", new THREE.BufferAttribute(targets.scattered.slice(), 3));
      geo.setAttribute("aScattered", new THREE.BufferAttribute(targets.scattered, 3));
      geo.setAttribute("aSettled", new THREE.BufferAttribute(targets.settled, 3));
    };
    setTargets();
    const rands = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rands[i] = Math.random();
    geo.setAttribute("aRand", new THREE.BufferAttribute(rands, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMorph1: { value: 0 },
        uMorph2: { value: 0 },
        uAccent: { value: 0 },
        uBurst: { value: 0 },
        uWarp: { value: 0 },
        uScroll: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(9999, 9999) },
        uMouseActive: { value: 0 },
        uDpr: { value: dpr },
        uResolution: { value: new THREE.Vector2(parent.clientWidth, parent.clientHeight) },
      },
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ---- Constellation: near the pointer, the ideas connect ------------
    // Faint lines link stars around the cursor (and spoke back to it), so
    // Ch.1 literally connects the dots. Star positions are re-derived on
    // the CPU with the exact vertex-shader math, so every line lands on
    // the dot it belongs to. Fades out as the build begins (uMorph1).
    const LINK_N = 96;    // only the first N stars can constellate
    const LINK_R = 230;   // stars this close to the pointer join the web
    const LINK_D = 210;   // pairs this close to each other link up
    const SPOKE_R = 150;  // stars this close spoke back to the cursor
    const MAX_SEG = 220;
    const linkGeo = new THREE.BufferGeometry();
    const linkPos = new Float32Array(MAX_SEG * 2 * 3);
    const linkCol = new Float32Array(MAX_SEG * 2 * 3);
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
    linkGeo.setAttribute("color", new THREE.BufferAttribute(linkCol, 3));
    linkGeo.setDrawRange(0, 0);
    const linkMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(linkGeo, linkMat);
    scene.add(lines);
    const linkPts = new Float32Array(LINK_N * 2);

    const updateLinks = () => {
      const s = glState.current;
      const act = mat.uniforms.uMouseActive.value;
      const fade = (1 - (s.morph1 ?? 0)) * (1 - (s.morph2 ?? 0)) * act;
      if (fade < 0.03) {
        linkGeo.setDrawRange(0, 0);
        return;
      }
      const t = mat.uniforms.uTime.value;
      const scr = s.scroll ?? 0;
      const mx = mat.uniforms.uMouse.value.x;
      const my = mat.uniforms.uMouse.value.y;
      const sc = geo.getAttribute("aScattered").array;
      const near = [];
      for (let i = 0; i < LINK_N; i++) {
        const r = rands[i];
        // same motion as the vertex shader: drift + parallax + cursor push
        let x = sc[i * 3] + Math.sin(t * 0.22 + r * 6.2831) * 7;
        let y = sc[i * 3 + 1] + Math.cos(t * 0.19 + r * 12.566) * 7;
        y += scr * (90 + 70 * ((r * 2.3) % 1));
        const z = sc[i * 3 + 2];
        x += mx * z * 0.00022 * act;
        y += my * z * 0.00022 * act;
        const dx = x - mx;
        const dy = y - my;
        let dist = Math.hypot(dx, dy) + 0.0001;
        const k = Math.min(Math.max((220 - dist) / 220, 0), 1);
        const push = k * k * (3 - 2 * k) * 60 * act;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
        linkPts[i * 2] = x;
        linkPts[i * 2 + 1] = y;
        dist = Math.hypot(x - mx, y - my);
        if (dist < LINK_R) near.push([i, dist]);
      }
      let seg = 0;
      const put = (x1, y1, x2, y2, str) => {
        if (seg >= MAX_SEG) return;
        const o = seg * 6;
        linkPos[o] = x1; linkPos[o + 1] = y1; linkPos[o + 2] = 0;
        linkPos[o + 3] = x2; linkPos[o + 4] = y2; linkPos[o + 5] = 0;
        linkCol[o] = str; linkCol[o + 1] = str; linkCol[o + 2] = str;
        linkCol[o + 3] = str * 0.85; linkCol[o + 4] = str * 0.85; linkCol[o + 5] = str * 0.85;
        seg++;
      };
      for (let a = 0; a < near.length; a++) {
        const [i, di] = near[a];
        const xi = linkPts[i * 2];
        const yi = linkPts[i * 2 + 1];
        // spokes: the cursor is the pen connecting the dots
        if (di < SPOKE_R) put(xi, yi, mx, my, (1 - di / SPOKE_R) * 0.5 * fade);
        for (let b = a + 1; b < near.length; b++) {
          const [j, dj] = near[b];
          const xj = linkPts[j * 2];
          const yj = linkPts[j * 2 + 1];
          const dp = Math.hypot(xi - xj, yi - yj);
          if (dp < LINK_D)
            put(
              xi, yi, xj, yj,
              (1 - dp / LINK_D) * (1 - Math.max(di, dj) / LINK_R) * 0.55 * fade
            );
        }
      }
      linkGeo.attributes.position.needsUpdate = true;
      linkGeo.attributes.color.needsUpdate = true;
      linkGeo.setDrawRange(0, seg * 2);
    };

    // mouse -> world px (same mapping as pointTargets). The uniform eases
    // toward this target each frame so the field glides instead of snapping.
    const mouseTarget = new THREE.Vector2(9999, 9999);
    let mouseActiveTarget = 0;
    const onPointer = (e) => {
      const r = parent.getBoundingClientRect();
      mouseTarget.set(
        e.clientX - r.left - parent.clientWidth / 2,
        -(e.clientY - r.top - parent.clientHeight / 2)
      );
      // first movement: jump straight there so the field doesn't sweep in
      // from the (9999, 9999) parking position
      if (mat.uniforms.uMouse.value.x > 8000) {
        mat.uniforms.uMouse.value.copy(mouseTarget);
      }
      mouseActiveTarget = 1;
    };
    const onPointerLeave = () => {
      mouseActiveTarget = 0;
    };
    parent.addEventListener("pointermove", onPointer, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave);

    // Render only while the hero is on screen and the tab is visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(parent);

    let raf;
    const clock = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const s = glState.current;
      mat.uniforms.uMorph1.value = s.morph1;
      mat.uniforms.uMorph2.value = s.morph2;
      mat.uniforms.uAccent.value = s.accent;
      mat.uniforms.uBurst.value = s.burst ?? 0;
      mat.uniforms.uScroll.value = s.scroll ?? 0;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      // scroll-velocity warp: decays on its own, eases toward the fling
      s.velo = (s.velo ?? 0) * 0.92;
      const warpTarget = Math.max(-1.4, Math.min(1.4, s.velo / 2500));
      s.warp = (s.warp ?? 0) + (warpTarget - s.warp) * 0.1;
      mat.uniforms.uWarp.value = s.warp;
      // ease the pointer uniforms — glide, don't snap
      mat.uniforms.uMouse.value.lerp(mouseTarget, 0.08);
      mat.uniforms.uMouseActive.value +=
        (mouseActiveTarget - mat.uniforms.uMouseActive.value) * 0.06;
      updateLinks();
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      fitCamera();
      mat.uniforms.uResolution.value.set(w, h);
      setTargets();
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => onResize());
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("pointermove", onPointer);
      parent.removeEventListener("pointerleave", onPointerLeave);
      geo.dispose();
      mat.dispose();
      linkGeo.dispose();
      linkMat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // the long opacity transition IS the starry fade-up after the intro
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 z-[3] pointer-events-none transition-opacity duration-[2500ms] ease-out ${
        skyIn ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
