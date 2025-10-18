'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollColorTransition.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollColorTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        backgroundColor: 'var(--page-bg)',
        color: 'var(--main-text)',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top -50%',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="color-transition-container">
      <div ref={triggerRef} className="scroll-trigger-section">
        <h1>Text Section 1</h1>
        <p>Scroll down to see the background color transition smoothly.</p>
      </div>
    </div>
  );
}
