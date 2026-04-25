import { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FadeInSection = ({ children, className = "", delay = 0 }: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
