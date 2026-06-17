import { useEffect, useRef, useState } from "react";

/**
 * Animated circular cursor:
 * - Smoothly follows the mouse (eased lerp)
 * - Idle: gentle pulse + slow-rotating dashed inner ring
 * - Hover on interactive elements: scales up + tints fill
 * - Click: quick bounce
 * - Disabled on touch / coarse-pointer devices
 */
export function AnimatedCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      const el = e.target as HTMLElement | null;
      const isInteractive = !!el?.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]',
      );
      setHovering(isInteractive);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const scale = clicking ? 0.85 : hovering ? 2.4 : 1;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: "var(--color-primary)",
              backgroundColor: hovering
                ? "color-mix(in oklab, var(--color-primary) 18%, transparent)"
                : "transparent",
              transition: "background-color 200ms ease",
            }}
          />
          <div
            className="absolute inset-1 rounded-full border border-dashed opacity-70 animate-[cursor-spin_6s_linear_infinite]"
            style={{ borderColor: "var(--color-primary)" }}
          />
          <div
            className="absolute inset-0 rounded-full border animate-[cursor-pulse_2.4s_ease-in-out_infinite]"
            style={{ borderColor: "var(--color-primary)" }}
          />
        </div>
      </div>

      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: "var(--color-primary)",
          opacity: visible && !hovering ? 1 : 0,
          transition: "opacity 180ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
