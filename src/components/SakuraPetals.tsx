import { useEffect, useRef } from "react";

const SakuraPetals = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPetal = () => {
      const petal = document.createElement("div");
      const size = Math.random() * 12 + 6;
      const startX = Math.random() * 100;
      const duration = Math.random() * 8 + 8;
      const delay = Math.random() * 5;
      const animClass = Math.random() > 0.5 ? "animate-sakura" : "animate-sakura-2";

      petal.className = `absolute ${animClass} pointer-events-none`;
      petal.style.cssText = `
        left: ${startX}%;
        top: -20px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(ellipse, hsl(340 100% 85% / 0.8), hsl(340 100% 90% / 0.3));
        border-radius: 50% 0 50% 0;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;

      container.appendChild(petal);
      setTimeout(() => petal.remove(), (duration + delay) * 1000);
    };

    const interval = setInterval(createPetal, 800);
    // Create initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(createPetal, i * 300);
    }

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-50" />;
};

export default SakuraPetals;
