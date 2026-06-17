import { useEffect, useRef } from "react";
import * as THREE from "three";

export function GlobeHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight = new THREE.PointLight(0xd4af37, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Core sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x050505,
        emissive: 0x111111,
        shininess: 50,
        transparent: true,
        opacity: 0.95,
      }),
    );
    earthGroup.add(sphere);

    // Particles
    const count = 2500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 3.1;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: 0.035,
        color: 0xd4af37,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      }),
    );
    earthGroup.add(points);

    // Wireframe
    earthGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(3.1, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xd4af37,
          wireframe: true,
          transparent: true,
          opacity: 0.06,
        }),
      ),
    );

    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      earthGroup.rotation.y += 0.0015;
      earthGroup.rotation.x += (mouse.y * 0.3 - earthGroup.rotation.x) * 0.03;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
