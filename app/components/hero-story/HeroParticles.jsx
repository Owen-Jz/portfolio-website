"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildTargets } from "./pointTargets.js";

const COUNT = 20000;

const VERT = /* glsl */ `
  attribute vec3 aScattered;
  attribute vec3 aExploded;
  attribute vec3 aSettled;
  attribute float aRand;
  uniform float uMorph1;   // scattered -> exploded
  uniform float uMorph2;   // exploded -> settled
  uniform float uScroll;   // 0..1 master timeline progress (sky parallax)
  uniform float uTime;
  uniform vec2 uMouse;     // world-space px (smoothed in JS)
  uniform float uMouseActive;
  uniform float uDpr;
  varying float vAlpha;
  varying float vHeat; // warm tint while a particle is part of the wireframe

  // Per-particle staggered, overshooting progress: each particle starts at a
  // slightly different time and pops past its target before settling.
  float staggered(float p, float r) {
    float local = clamp((p - r * 0.35) / 0.65, 0.0, 1.0);
    float back = 1.70158;
    float t = local - 1.0;
    return t * t * ((back + 1.0) * t + back) + 1.0; // back.out
  }

  void main() {
    // Three populations: ~18% are SKY STARS (visible in Ch.1, they thin out
    // through the build and never join the wireframe); ~30% of the rest is
    // DUST that condenses into the UI wireframe during Ch.2 — a sparse
    // dotted outline, not a solid band; the remainder stays dark.
    float isStar = step(0.82, aRand);
    float isMesh = (1.0 - isStar) * step(0.7, fract(aRand * 7.77));

    float pMesh = staggered(uMorph1, aRand) * isMesh; // stars never assemble
    float p2 = staggered(uMorph2, fract(aRand * 7.31));
    vec3 pos = mix(aScattered, aExploded, pMesh);
    pos = mix(pos, aSettled, p2); // Ch.3: everything disperses outward

    float free = 1.0 - pMesh; // 1 for sky/unassembled, 0 once in the wireframe

    // ambient drift so the sky is never a still — damped hard once a
    // particle takes its place in the wireframe, so the outlines stay crisp
    float driftAmp = 7.0 * (0.25 + 0.75 * free);
    pos.x += sin(uTime * 0.22 + aRand * 6.2831) * driftAmp;
    pos.y += cos(uTime * 0.19 + aRand * 12.566) * driftAmp;

    // scroll parallax: the sky climbs far slower than the pinned foreground,
    // so the stars read as a distant background layer
    pos.y += uScroll * (90.0 + 70.0 * fract(aRand * 2.3)) * free;

    // galaxy parallax: deeper stars shift more with the pointer, so moving
    // the mouse feels like drifting through the field. Off once assembled
    // (the wireframe must stay registered to the DOM).
    pos.xy += uMouse * (pos.z * 0.00022) * free * uMouseActive;

    // local pointer interaction: nearby stars part around the cursor
    vec2 d = pos.xy - uMouse;
    float dist = length(d);
    float push = smoothstep(220.0, 0.0, dist) * 60.0 * uMouseActive;
    pos.xy += normalize(d + 0.0001) * push * (0.35 + 0.65 * free);

    // stars near the pointer brighten softly
    float glow = smoothstep(260.0, 0.0, dist) * uMouseActive;

    // --- visibility -----------------------------------------------------
    float twinkle = 0.5 + 0.5 * sin(uTime * (0.6 + fract(aRand * 3.7) * 1.8) + aRand * 40.0);
    // the sky thins through the build: 60% of stars fade hard, the rest dim
    float fadeGroup = step(0.4, fract(aRand * 9.7));
    float thin = 1.0 - uMorph1 * (0.35 + 0.5 * fadeGroup);
    float starAlpha = isStar * (0.3 + 0.45 * twinkle) * thin;
    // dust becomes visible only as it takes its place in the wireframe
    float meshAlpha = isMesh * 0.42 * pMesh;
    float alpha = max(starAlpha, meshAlpha) + glow * 0.35 * free;
    // Ch.3: the sky disperses and dies away, revealing the backdrop
    alpha *= 1.0 - p2 * 0.88;
    vAlpha = min(alpha, 0.9);
    vHeat = pMesh * (1.0 - p2);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    // orthographic camera: sizes are plain CSS pixels (times DPR)
    float starSize = 1.0 + fract(aRand * 5.3) * 2.6;
    float meshSize = 1.1 + aRand * 1.1;
    gl_PointSize = mix(starSize, meshSize, pMesh) * uDpr * 0.8;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uAccent; // 0 = white dust, 1 = red-tinted ship state
  uniform vec2 uResolution;
  varying float vAlpha;
  varying float vHeat;

  // Interleaved gradient noise — cheap dithering to prevent banding on the
  // dark canvas (spec: dark-on-dark over #0a0a0a bands without it).
  float ign(vec2 v) {
    return fract(52.9829189 * fract(dot(v, vec2(0.06711056, 0.00583715))));
  }

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.12, d) * vAlpha;
    alpha -= ign(gl_FragCoord.xy) * 0.04; // dither
    vec3 white = vec3(0.92);
    vec3 red = vec3(0.69, 0.13, 0.13);
    float tint = max(uAccent * 0.65, vHeat * 0.3);
    gl_FragColor = vec4(mix(white, red, tint), max(alpha, 0.0));
  }
`;

export default function HeroParticles({ glState, stageRef, onFail }) {
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
    // Depth (z) can never bend positions, so the wireframe registers to the
    // DOM exactly — z stays purely a parallax/animation channel.
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

    // Sample the real UI rects for the wireframe, in the canvas's own
    // coordinate space (one source of truth for offsets AND size). The 12px
    // pad matches the blueprint frames so the stars outline the elements
    // instead of sitting on the glyphs.
    const stage = stageRef.current;
    const FRAME_PAD = 12;
    const planeZ = { headline: 0, subline: -14, ctas: -28, badge: -42 };
    // The type holds --wght 500 through the build plateau, and variable-font
    // weight changes glyph widths — so measure at THAT weight, or the
    // wireframe outlines a narrower headline than the one on screen.
    // Set + measure + restore happens in one synchronous tick: no paint,
    // no flash.
    const WIREFRAME_WGHT = "500";
    const sampleRects = (canvasBox) => {
      const variableEls = ["headline", "subline"]
        .map((key) => stage.querySelector(`[data-hero="${key}"]`))
        .filter(Boolean);
      const prevWghts = variableEls.map((el) => el.style.getPropertyValue("--wght"));
      variableEls.forEach((el) => el.style.setProperty("--wght", WIREFRAME_WGHT));
      const rects = Object.entries(planeZ)
        .map(([key, z]) => {
          const el = stage.querySelector(`[data-hero="${key}"]`);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: r.left - canvasBox.left - FRAME_PAD,
            y: r.top - canvasBox.top - FRAME_PAD,
            width: r.width + FRAME_PAD * 2,
            height: r.height + FRAME_PAD * 2,
            z,
          };
        })
        .filter(Boolean);
      variableEls.forEach((el, i) => {
        if (prevWghts[i]) el.style.setProperty("--wght", prevWghts[i]);
        else el.style.removeProperty("--wght");
      });
      return rects;
    };

    const geo = new THREE.BufferGeometry();
    const setTargets = () => {
      const canvasBox = canvas.getBoundingClientRect();
      if (canvasBox.width === 0) return;
      const targets = buildTargets({
        count: COUNT,
        rects: sampleRects(canvasBox),
        viewport: { w: canvasBox.width, h: canvasBox.height },
        seed: 20260705,
      });
      // position attr is required by three but unused (vertex shader computes pos)
      geo.setAttribute("position", new THREE.BufferAttribute(targets.scattered.slice(), 3));
      geo.setAttribute("aScattered", new THREE.BufferAttribute(targets.scattered, 3));
      geo.setAttribute("aExploded", new THREE.BufferAttribute(targets.exploded, 3));
      geo.setAttribute("aSettled", new THREE.BufferAttribute(targets.settled, 3));
    };
    setTargets();
    // Layout keeps settling after mount (variable font landing, entrance
    // animation, late scrollbar) — re-sample a few times so the wireframe
    // targets always match the final layout.
    let alive = true;
    document.fonts?.ready?.then(() => {
      if (alive) setTargets();
    });
    const retryIds = [400, 1200, 2800].map((ms) =>
      setTimeout(() => {
        if (alive) setTargets();
      }, ms)
    );
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
      mat.uniforms.uScroll.value = s.scroll ?? 0;
      mat.uniforms.uTime.value = clock.getElapsedTime();
      // ease the pointer uniforms — glide, don't snap
      mat.uniforms.uMouse.value.lerp(mouseTarget, 0.08);
      mat.uniforms.uMouseActive.value +=
        (mouseActiveTarget - mat.uniforms.uMouseActive.value) * 0.06;
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      fitCamera();
      mat.uniforms.uResolution.value.set(w, h);
      // targets are in CSS-pixel coordinates — stale ones misalign the
      // wireframe the moment the viewport changes (resize, DevTools, late
      // scrollbar), so re-sample the real layout every time
      setTargets();
    };
    window.addEventListener("resize", onResize);
    // catches size changes window "resize" misses (scrollbar appearing
    // after ScrollTrigger refresh, zoom, UI chrome)
    const ro = new ResizeObserver(() => onResize());
    ro.observe(parent);

    return () => {
      alive = false;
      retryIds.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("pointermove", onPointer);
      parent.removeEventListener("pointerleave", onPointerLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-[3] pointer-events-none"
    />
  );
}
