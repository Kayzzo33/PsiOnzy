import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  subtitle: string;
  title: string;
  className?: string;
  dark?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, className, dark = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(lineRef.current, { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power3.inOut" })
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(titleRef.current, { y: 30, opacity: 0, duration: 0.6 }, "-=0.3");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const textColor = dark ? 'text-cream' : 'text-charcoal';
  const subColor = dark ? 'text-terracotta' : 'text-terracotta';
  const lineColor = dark ? 'bg-terracotta' : 'bg-charcoal';

  return (
    <div ref={containerRef} className={`mb-12 md:mb-20 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        <div ref={lineRef} className={`h-[1px] w-12 ${lineColor}`} />
        <h3 ref={subRef} className={`font-sans text-sm font-semibold tracking-widest uppercase ${subColor}`}>
          {subtitle}
        </h3>
      </div>
      <h2 ref={titleRef} className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight ${textColor}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;