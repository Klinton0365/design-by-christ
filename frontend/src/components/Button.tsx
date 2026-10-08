"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

type ButtonProps = {
  children: ReactNode;
  variant?: "dark" | "gold";
  className?: string;
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

type ShaderProps = {
  radius: number;
  lineColor: string;
  baseColor: string;
  intensity: number;
  shineSize: number;
  shineFade: number;
  thickness: number;
  speed: number;
  proximity: number;
};

const SHINE_BY_VARIANT: Record<"dark" | "gold", ShaderProps> = {
  dark: {
    radius: 18,
    lineColor: "#e9c878",
    baseColor: "#1a1410",
    intensity: 1,
    shineSize: 10,
    shineFade: 40,
    thickness: 1.2,
    speed: 0.35,
    proximity: 220,
  },
  gold: {
    radius: 18,
    lineColor: "#fff8e8",
    baseColor: "#ffffff",
    intensity: 0.9,
    shineSize: 10,
    shineFade: 40,
    thickness: 1.2,
    speed: 0.35,
    proximity: 220,
  },
};

function useSpecularShine(
  btnRef: React.RefObject<HTMLElement | null>,
  fxRef: React.RefObject<HTMLSpanElement | null>,
  shine: ShaderProps,
  enabled: boolean
) {
  const shineRef = useRef(shine);

  useEffect(() => {
    shineRef.current = shine;
  }, [shine]);

  useEffect(() => {
    const btn = btnRef.current;
    const fx = fxRef.current;
    if (!enabled || !btn || !fx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.cssText = "display:block;width:100%;height:100%;";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    // OGL tracks GL state itself (blend/depth/cull) and re-applies it from
    // the Program's own config on every render call, so enabling blend
    // directly on the raw context before this point gets silently reset —
    // it has to be declared here instead.
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uBaseColor: { value: [0.1, 0.08, 0.06] },
        uIntensity: { value: 1 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const sizeRef = { w: 1, h: 1 };
    const resize = () => {
      const rect = btn.getBoundingClientRect();
      sizeRef.w = rect.width;
      sizeRef.h = rect.height;
      renderer.setSize(rect.width + PAD * 2, rect.height + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + rect.width / 2) * dpr, (PAD + rect.height / 2) * dpr];
      program.uniforms.uHalfSize.value = [(rect.width / 2) * dpr, (rect.height / 2) * dpr];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(btn);
    resize();

    let pointerAngle: number | null = null;
    let proximityT = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(shineRef.current.proximity, 1));
      proximityT = t * t * (3 - 2 * t);
    };
    window.addEventListener("pointermove", onPointerMove);

    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;

    const lineC = new Color();
    const baseC = new Color();

    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = shineRef.current;

      idleAngle += p.speed * dt;
      const target = pointerAngle != null ? pointerAngle : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));

      bright += (proximityT - bright) * (1 - Math.exp(-dt * 8));

      lineC.set(p.lineColor);
      baseC.set(p.baseColor);
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = p.intensity * bright;
      program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = p.thickness * dpr;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [btnRef, fxRef, enabled]);
}

export default function Button({
  href,
  onClick,
  children,
  variant = "dark",
  className = "",
}: ButtonProps) {
  const elRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useSpecularShine(elRef, fxRef, SHINE_BY_VARIANT[variant], !reducedMotion);

  const bg =
    variant === "dark"
      ? "border border-white/10 bg-white/5 backdrop-blur-xl"
      : "border border-white/25 bg-white/10 backdrop-blur-xl";
  const iconColor = variant === "dark" ? "text-gold" : "text-white";
  const classes = `relative inline-flex items-center justify-center gap-2.5 rounded-[18px] ${bg} px-9 py-6 font-body text-[18px] font-semibold tracking-wide text-white glow-gold transition-opacity hover:opacity-90 ${className}`;

  const fx = <span ref={fxRef} aria-hidden className="pointer-events-none absolute -inset-5 z-0" />;

  const icon = (
    <span aria-hidden className={`relative z-10 inline-flex h-[15px] w-[15px] shrink-0 ${iconColor}`}>
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  const label = <span className="relative z-10">{children}</span>;

  if (href) {
    return (
      <Link href={href} ref={elRef} className={classes}>
        {fx}
        {label}
        {icon}
      </Link>
    );
  }

  return (
    <button ref={elRef} type="button" onClick={onClick} className={classes}>
      {fx}
      {label}
      {icon}
    </button>
  );
}
