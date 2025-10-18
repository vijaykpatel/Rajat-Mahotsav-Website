'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollColorWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        backgroundColor: 'var(--page-bg)',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--title-section-bg)', minHeight: '100vh' }}>
      <div ref={triggerRef} style={{ minHeight: '300vh' }}>
        {children}
      </div>
    </div>
  );
}
