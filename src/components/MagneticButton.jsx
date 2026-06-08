/**
 * MagneticButton.jsx — Magnetic hover CTA
 * Implements "Magnetic Micro-physics" from skill §5.
 * Eligibility: MOTION_INTENSITY:6, brief reads premium consumer.
 * Implements EXCLUSIVELY with useMotionValue/useTransform/useSpring — never useState (§3.B).
 * Collapses to static button under prefers-reduced-motion (§6.B).
 */
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function MagneticButton({ children, className, style, onClick, href, id, ...props }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Motion values — outside React render cycle, zero re-renders
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.3);
    rawY.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={reduce ? {} : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        id={id}
        href={href}
        onClick={onClick}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
