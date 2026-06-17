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
    const pointsMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, pointsMat);
    earthGroup.add(points);

    // Wireframe
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(3.1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      }),
    );
    earthGroup.add(wire);

    // Outer glow ring of particles that reacts on hold
    const glowGeo = new THREE.SphereGeometry(3.35, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    earthGroup.add(glow);

    // Mouse / interaction state
    const target = new THREE.Vector2();
    const mouse = new THREE.Vector2();
    let isPointerInside = false;
    let isHolding = false;
    let holdStrength = 0; // 0..1 eases toward 1 while holding
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragVX = 0;
    let dragVY = 0;
    let autoSpin = 0.0015;
    let spinBoost = 0; // eases up while holding
    const raycaster = new THREE.Raycaster();
    const cursorWorld = new THREE.Vector3();
    const cursorLocal = new THREE.Vector3();
    const invMat = new THREE.Matrix4();

    const updateTargetFromEvent = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
      target.x = nx;
      target.y = ny;
    };

    const onMove = (e: MouseEvent) => {
      updateTargetFromEvent(e.clientX, e.clientY);
      if (isHolding) {
        dragVY = (e.clientX - lastPointerX) * 0.005;
        dragVX = (e.clientY - lastPointerY) * 0.005;
      }
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
    };
    const onEnter = () => { isPointerInside = true; };
    const onLeave = () => { isPointerInside = false; };
    const onDown = (e: MouseEvent) => {
      isHolding = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      container.style.cursor = "grabbing";
    };
    const onUp = () => {
      isHolding = false;
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      isHolding = true;
      lastPointerX = t.clientX;
      lastPointerY = t.clientY;
      updateTargetFromEvent(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      updateTargetFromEvent(t.clientX, t.clientY);
      if (isHolding) {
        dragVY = (t.clientX - lastPointerX) * 0.005;
        dragVX = (t.clientY - lastPointerY) * 0.005;
      }
      lastPointerX = t.clientX;
      lastPointerY = t.clientY;
    };
    const onTouchEnd = () => { isHolding = false; };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Ease mouse and hold strength
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      holdStrength += ((isHolding ? 1 : 0) - holdStrength) * 0.12;
      spinBoost += ((isHolding ? 0.02 : 0) - spinBoost) * 0.08;

      // Idle "breathing" pulse — gentle scale + opacity shimmer
      const breathe = 1 + Math.sin(t * 1.2) * 0.012;
      const pressScale = 1 - holdStrength * 0.04; // squish on hold
      earthGroup.scale.setScalar(breathe * pressScale);

      // Idle drift when pointer is outside container
      const idleX = isPointerInside ? 0 : Math.sin(t * 0.4) * 0.15;
      const idleY = isPointerInside ? 0 : Math.cos(t * 0.3) * 0.1;

      // Pointer parallax
      const desiredRotX = (mouse.y * -0.5) + idleY;
      const desiredRotY = (mouse.x * 0.6) + idleX;

      // Drag inertia adds to rotation while holding
      if (isHolding) {
        earthGroup.rotation.x += dragVX;
        earthGroup.rotation.y += dragVY;
        dragVX *= 0.9;
        dragVY *= 0.9;
      } else {
        earthGroup.rotation.x += (desiredRotX - earthGroup.rotation.x) * 0.04;
        earthGroup.rotation.y += (desiredRotY - earthGroup.rotation.y) * 0.04 + autoSpin;
        // residual inertia
        earthGroup.rotation.x += dragVX;
        earthGroup.rotation.y += dragVY;
        dragVX *= 0.94;
        dragVY *= 0.94;
      }

      // Spin boost while held
      earthGroup.rotation.y += spinBoost;

      // Particle pulse + cursor repel while holding
      const positions = geo.attributes.position.array as Float32Array;
      const pulse = 1 + Math.sin(t * 2) * 0.008 + holdStrength * 0.03;

      raycaster.setFromCamera(target, camera);
      const hits = raycaster.intersectObject(sphere, false);
      const hasHit = hits.length > 0;
      if (hasHit) cursorWorld.copy(hits[0].point);
      earthGroup.updateMatrixWorld();
      invMat.copy(earthGroup.matrixWorld).invert();
      cursorLocal.copy(cursorWorld).applyMatrix4(invMat);

      const repelRadius = 2.0;
      const repelStrength = 1.6 * holdStrength;
      for (let i = 0; i < count; i++) {
        let x = orig[i * 3] * pulse;
        let y = orig[i * 3 + 1] * pulse;
        let z = orig[i * 3 + 2] * pulse;
        if (hasHit && repelStrength > 0.001) {
          const dx = x - cursorLocal.x;
          const dy = y - cursorLocal.y;
          const dz = z - cursorLocal.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < repelRadius && dist > 0.0001) {
            const falloff = 1 - dist / repelRadius;
            const push = falloff * falloff * repelStrength;
            const inv = 1 / dist;
            x += dx * inv * push;
            y += dy * inv * push;
            z += dz * inv * push;
          }
        }
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
      }
      geo.attributes.position.needsUpdate = true;

      // Glow + particle size react to hold
      pointsMat.size = 0.035 + holdStrength * 0.04;
      pointsMat.opacity = 0.85 + Math.sin(t * 2.5) * 0.05;
      glowMat.opacity = 0.04 + holdStrength * 0.18 + Math.sin(t * 1.6) * 0.01;
      glow.scale.setScalar(1 + holdStrength * 0.08);

      // Light orbits subtly
      pointLight.position.x = Math.cos(t * 0.6) * 6;
      pointLight.position.z = Math.sin(t * 0.6) * 6;
      pointLight.intensity = 2 + holdStrength * 1.5;

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
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
      renderer.dispose();
      geo.dispose();
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
      glowGeo.dispose();
      glowMat.dispose();
      pointsMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
