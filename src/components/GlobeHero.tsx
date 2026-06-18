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
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const GOLD = 0xd4af37;
    const GOLD_SOFT = 0xf5d57a;

    // Distant starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.55 }),
    );
    scene.add(stars);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight = new THREE.PointLight(GOLD, 2.2, 60);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Core sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x050505,
        emissive: 0x0a0a0a,
        shininess: 60,
        transparent: true,
        opacity: 0.95,
      }),
    );
    earthGroup.add(sphere);

    // Surface particles
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
      color: GOLD,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, pointsMat);
    earthGroup.add(points);

    // Wireframe
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(3.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.06 }),
    );
    earthGroup.add(wire);

    // Outer glow
    const glowGeo = new THREE.SphereGeometry(3.35, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    earthGroup.add(glow);

    // ---- Orbiting rings (tilted ellipses) ----
    const makeRing = (radius: number, tiltX: number, tiltZ: number, opacity: number) => {
      const segs = 128;
      const ringGeo = new THREE.BufferGeometry();
      const rp = new Float32Array((segs + 1) * 3);
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        rp[i * 3] = Math.cos(a) * radius;
        rp[i * 3 + 1] = 0;
        rp[i * 3 + 2] = Math.sin(a) * radius;
      }
      ringGeo.setAttribute("position", new THREE.BufferAttribute(rp, 3));
      const line = new THREE.Line(
        ringGeo,
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity, blending: THREE.AdditiveBlending }),
      );
      line.rotation.x = tiltX;
      line.rotation.z = tiltZ;
      return line;
    };
    const ring1 = makeRing(3.45, Math.PI / 2.4, 0.2, 0.4);
    const ring2 = makeRing(3.7, Math.PI / 3.5, -0.5, 0.28);
    const ring3 = makeRing(3.95, Math.PI / 5, 0.8, 0.18);
    earthGroup.add(ring1, ring2, ring3);

    // ---- Satellites travelling along the rings ----
    const satGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: GOLD_SOFT });
    type Sat = { mesh: THREE.Mesh; radius: number; speed: number; phase: number; tiltX: number; tiltZ: number };
    const sats: Sat[] = [
      { mesh: new THREE.Mesh(satGeo, satMat.clone()), radius: 3.45, speed: 0.35, phase: 0, tiltX: Math.PI / 2.4, tiltZ: 0.2 },
      { mesh: new THREE.Mesh(satGeo, satMat.clone()), radius: 3.7, speed: -0.22, phase: 2.1, tiltX: Math.PI / 3.5, tiltZ: -0.5 },
      { mesh: new THREE.Mesh(satGeo, satMat.clone()), radius: 3.95, speed: 0.18, phase: 4.3, tiltX: Math.PI / 5, tiltZ: 0.8 },
    ];
    sats.forEach((s) => earthGroup.add(s.mesh));

    // ---- Great-circle arcs connecting random surface "cities" ----
    const cityCount = 12;
    const cities: THREE.Vector3[] = [];
    for (let i = 0; i < cityCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      cities.push(new THREE.Vector3(
        3 * Math.sin(phi) * Math.cos(theta),
        3 * Math.sin(phi) * Math.sin(theta),
        3 * Math.cos(phi),
      ));
    }

    // City markers (pulsing dots)
    const cityDotMat = new THREE.MeshBasicMaterial({ color: GOLD_SOFT, transparent: true, opacity: 0.9 });
    const cityMeshes = cities.map((c) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), cityDotMat.clone());
      m.position.copy(c).multiplyScalar(1.02);
      earthGroup.add(m);
      return m;
    });

    type Arc = {
      line: THREE.Line;
      points: THREE.Vector3[];
      progress: number; // 0..1 reveal
      life: number; // seconds remaining visible after full
      speed: number;
    };
    const arcs: Arc[] = [];
    const ARC_SEGMENTS = 60;

    const spawnArc = () => {
      if (arcs.length > 6) return;
      const a = cities[Math.floor(Math.random() * cities.length)];
      let b = cities[Math.floor(Math.random() * cities.length)];
      if (a === b) b = cities[(cities.indexOf(a) + 1) % cities.length];
      // Build great-circle arc with altitude bump
      const pts: THREE.Vector3[] = [];
      const angle = a.angleTo(b);
      const axis = new THREE.Vector3().crossVectors(a, b).normalize();
      for (let i = 0; i <= ARC_SEGMENTS; i++) {
        const t = i / ARC_SEGMENTS;
        const q = new THREE.Quaternion().setFromAxisAngle(axis, angle * t);
        const p = a.clone().applyQuaternion(q);
        // lift toward midpoint
        const lift = Math.sin(t * Math.PI) * (0.6 + angle * 0.3);
        p.setLength(3 + lift);
        pts.push(p);
      }
      const ag = new THREE.BufferGeometry();
      const arr = new Float32Array((ARC_SEGMENTS + 1) * 3);
      ag.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      ag.setDrawRange(0, 0);
      const line = new THREE.Line(
        ag,
        new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }),
      );
      earthGroup.add(line);
      arcs.push({ line, points: pts, progress: 0, life: 1.2 + Math.random() * 1.5, speed: 0.7 + Math.random() * 0.8 });
    };

    let nextArcAt = 0;

    // ---- Interaction state ----
    const target = new THREE.Vector2();
    const mouse = new THREE.Vector2();
    let isPointerInside = false;
    let isHolding = false;
    let holdStrength = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragVX = 0;
    let dragVY = 0;
    const autoSpin = 0.0015;
    let spinBoost = 0;
    let baseRotX = 0;
    let baseRotY = 0;
    const raycaster = new THREE.Raycaster();
    const cursorWorld = new THREE.Vector3();
    const cursorLocal = new THREE.Vector3();
    const invMat = new THREE.Matrix4();

    const updateTargetFromEvent = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      target.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -((clientY - rect.top) / rect.height) * 2 + 1;
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
      spawnArc();
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

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      isHolding = true; lastPointerX = t.clientX; lastPointerY = t.clientY;
      updateTargetFromEvent(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]; if (!t) return;
      updateTargetFromEvent(t.clientX, t.clientY);
      if (isHolding) {
        dragVY = (t.clientX - lastPointerX) * 0.005;
        dragVX = (t.clientY - lastPointerY) * 0.005;
      }
      lastPointerX = t.clientX; lastPointerY = t.clientY;
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
      const dt = Math.min(clock.getDelta(), 0.05);

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      holdStrength += ((isHolding ? 1 : 0) - holdStrength) * 0.12;
      spinBoost += ((isHolding ? 0.02 : 0) - spinBoost) * 0.08;

      const breathe = 1 + Math.sin(t * 1.2) * 0.012;
      const pressScale = 1 - holdStrength * 0.04;
      earthGroup.scale.setScalar(breathe * pressScale);

      const idleX = isPointerInside ? 0 : Math.sin(t * 0.4) * 0.15;
      const idleY = isPointerInside ? 0 : Math.cos(t * 0.3) * 0.1;

      baseRotX += dragVX;
      baseRotY += dragVY;
      if (!isHolding) {
        baseRotY += autoSpin;
        dragVX *= 0.94;
        dragVY *= 0.94;
      } else {
        dragVX *= 0.9;
        dragVY *= 0.9;
      }
      baseRotY += spinBoost;

      const parallaxX = (mouse.y * -0.25) + idleY;
      const parallaxY = (mouse.x * 0.3) + idleX;
      earthGroup.rotation.x = baseRotX + parallaxX;
      earthGroup.rotation.y = baseRotY + parallaxY;

      // Particle pulse + cursor repel
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

      pointsMat.size = 0.035 + holdStrength * 0.04;
      pointsMat.opacity = 0.85 + Math.sin(t * 2.5) * 0.05;
      glowMat.opacity = 0.04 + holdStrength * 0.18 + Math.sin(t * 1.6) * 0.01;
      glow.scale.setScalar(1 + holdStrength * 0.08);

      pointLight.position.x = Math.cos(t * 0.6) * 6;
      pointLight.position.z = Math.sin(t * 0.6) * 6;
      pointLight.intensity = 2 + holdStrength * 1.5;

      // Stars subtle counter-rotation
      stars.rotation.y = t * 0.01;

      // Satellites along their rings
      sats.forEach((s) => {
        const a = t * s.speed + s.phase;
        const lx = Math.cos(a) * s.radius;
        const lz = Math.sin(a) * s.radius;
        // local position then apply ring tilt (rotateX then rotateZ)
        const v = new THREE.Vector3(lx, 0, lz);
        v.applyEuler(new THREE.Euler(s.tiltX, 0, s.tiltZ));
        s.mesh.position.copy(v);
      });

      // City dots pulse
      cityMeshes.forEach((m, i) => {
        const s = 1 + Math.sin(t * 2.5 + i) * 0.35;
        m.scale.setScalar(s);
        (m.material as THREE.MeshBasicMaterial).opacity = 0.55 + Math.sin(t * 2.5 + i) * 0.35;
      });

      // Spawn arcs periodically (more often while holding)
      if (t > nextArcAt) {
        spawnArc();
        nextArcAt = t + (isHolding ? 0.45 : 1.6 + Math.random() * 1.4);
      }

      // Animate arcs (reveal then fade)
      for (let i = arcs.length - 1; i >= 0; i--) {
        const a = arcs[i];
        const arr = a.line.geometry.attributes.position.array as Float32Array;
        if (a.progress < 1) {
          a.progress = Math.min(1, a.progress + dt * a.speed);
          const visible = Math.floor(a.progress * (ARC_SEGMENTS + 1));
          for (let j = 0; j < visible; j++) {
            arr[j * 3] = a.points[j].x;
            arr[j * 3 + 1] = a.points[j].y;
            arr[j * 3 + 2] = a.points[j].z;
          }
          a.line.geometry.setDrawRange(0, visible);
          a.line.geometry.attributes.position.needsUpdate = true;
        } else {
          a.life -= dt;
          const mat = a.line.material as THREE.LineBasicMaterial;
          mat.opacity = Math.max(0, a.life / 1.4) * 0.9;
          if (a.life <= 0) {
            earthGroup.remove(a.line);
            a.line.geometry.dispose();
            (a.line.material as THREE.Material).dispose();
            arcs.splice(i, 1);
          }
        }
      }

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
      starGeo.dispose();
      (stars.material as THREE.Material).dispose();
      satGeo.dispose();
      arcs.forEach((a) => { a.line.geometry.dispose(); (a.line.material as THREE.Material).dispose(); });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
