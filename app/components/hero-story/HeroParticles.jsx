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
  uniform float uTime;
  uniform vec2 uMouse;     // world-space px (smoothed in JS)
  uniform float uMouseActive;
  varying float vAlpha;

  // Per-particle staggered, overshooting progress: each particle starts at a
  // slightly different time and pops past its target before settling.
  float staggered(float p, float r) {
    float local = clamp((p - r * 0.35) / 0.65, 0.0, 1.0);
    float back = 1.70158;
    float t = local - 1.0;
    return t * t * ((back + 1.0) * t + back) + 1.0; // back.out
  }

  void main() {
    float p1 = staggered(uMorph1, aRand);
    float p2 = staggered(uMorph2, fract(aRand * 7.31));
    vec3 pos = mix(aScattered, aExploded, p1);
    pos = mix(pos, aSettled, p2);

    // ambient drift so the sky is never a still
    pos.x += sin(uTime * 0.22 + aRand * 6.2831) * 7.0;
    pos.y += cos(uTime * 0.19 + aRand * 12.566) * 7.0;

    float free = 1.0 - p1; // 1 while scattered (Ch.1), 0 once assembled

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

    // ~18% of particles are Ch.1 stars; the rest are hidden dust that
    // materializes as the wireframe assembles in Ch.2
    float isStar = step(0.82, aRand);
    float twinkle = 0.5 + 0.5 * sin(uTime * (0.6 + fract(aRand * 3.7) * 1.8) + aRand * 40.0);
    float starAlpha = isStar * (0.3 + 0.45 * twinkle);
    vAlpha = min(mix(starAlpha, 0.55, p1) + glow * 0.35 * free, 0.9);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float starSize = 1.0 + fract(aRand * 5.3) * 2.6;
    float meshSize = 1.6 + aRand * 1.8;
    gl_PointSize = mix(starSize, meshSize, p1) * (600.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform float uAccent; // 0 = white dust, 1 = red-tinted ship state
  uniform vec2 uResolution;
  varying float vAlpha;

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
    gl_FragColor = vec4(mix(white, red, uAccent * 0.65), max(alpha, 0.0));
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
    const vw = parent.clientWidth;
    const vh = parent.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(vw, vh, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, vw / vh, 1, 5000);
    // camera distance such that 1 world unit ~ 1 CSS px at z=0
    camera.position.z = vh / (2 * Math.tan((camera.fov * Math.PI) / 360));

    // Sample the real UI rects for the exploded wireframe
    const stage = stageRef.current;
    const parentBox = parent.getBoundingClientRect();
    const planeZ = { headline: 0, subline: -40, ctas: -90, badge: -140 };
    const rects = Object.entries(planeZ)
      .map(([key, z]) => {
        const el = stage.querySelector(`[data-hero="${key}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - parentBox.left,
          y: r.top - parentBox.top,
          width: r.width,
          height: r.height,
          z,
        };
      })
      .filter(Boolean);

    const targets = buildTargets({
      count: COUNT,
      rects,
      viewport: { w: vw, h: vh },
      seed: 20260705,
    });

    const geo = new THREE.BufferGeometry();
    // position attr is required by three but unused (vertex shader computes pos)
    geo.setAttribute("position", new THREE.BufferAttribute(targets.scattered.slice(), 3));
    geo.setAttribute("aScattered", new THREE.BufferAttribute(targets.scattered, 3));
    geo.setAttribute("aExploded", new THREE.BufferAttribute(targets.exploded, 3));
    geo.setAttribute("aSettled", new THREE.BufferAttribute(targets.settled, 3));
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
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(9999, 9999) },
        uMouseActive: { value: 0 },
        uResolution: { value: new THREE.Vector2(vw, vh) },
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
      camera.aspect = w / h;
      camera.position.z = h / (2 * Math.tan((camera.fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
      mat.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
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
