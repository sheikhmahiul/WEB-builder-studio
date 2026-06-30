import { useEffect, useRef, useState } from "react";

/**
 * Subtle WebGL luxury background — deep onyx with two slowly drifting
 * gold orbs. Pure WebGL, no library. Mounted once globally.
 */
export function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const canvas = ref.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const syncSize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor((canvas.clientWidth || window.innerWidth) * dpr);
      const h = Math.floor((canvas.clientHeight || window.innerHeight) * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    const vs = `attribute vec2 a_position;
varying vec2 v_uv;
void main(){ v_uv = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }`;

    const fs = `precision highp float;
varying vec2 v_uv;
uniform float u_time;

// Random function for stars
float rand(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main(){
  vec2 uv = v_uv;
  
  // Base dark background (night mode)
  vec3 base = vec3(0.01, 0.01, 0.02);
  
  // Starfield effect (dots)
  float star = rand(uv);
  // Only show very few bright pixels (stars)
  if (star > 0.995) {
    float twinkle = sin(u_time * 2.0 + star * 100.0) * 0.5 + 0.5;
    base += vec3(0.8, 0.8, 0.9) * twinkle;
  }
  
  // Subtle gradient / nebula noise for premium glassy feel
  float noise = sin(uv.x * 2.0 + u_time * 0.1) * cos(uv.y * 2.0 - u_time * 0.15) * 0.5 + 0.5;
  base += vec3(0.04, 0.03, 0.05) * noise;

  // Single very soft gold glow on the left (removed right one to fix bug)
  float o1 = 1.0 - length(uv - vec2(0.2, 0.7) + vec2(sin(u_time*0.3)*0.05, cos(u_time*0.3)*0.05));
  vec3 gold = vec3(0.83, 0.69, 0.22);
  base += gold * pow(max(0.0, o1), 8.0) * 0.08;

  gl_FragColor = vec4(base, 1.0);
}`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");

    let raf = 0;
    const render = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  if (isMobile) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
