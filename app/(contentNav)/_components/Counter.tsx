"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  targetNumber: number;
  isSuffix?: string;
  duration?: number;
}

export default function Counter({
  targetNumber,
  isSuffix = "",
  duration = 2000,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(targetNumber * progress));
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [hasStarted, targetNumber, duration]);

  return (
    <div ref={ref}>
      {count}
      {isSuffix}
    </div>
  );
}
