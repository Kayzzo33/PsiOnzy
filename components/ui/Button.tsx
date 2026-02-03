import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  icon = false,
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const circle = circleRef.current;

    if (!btn || !circle) return;

    // Magnetic effect implementation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(btn, {
        duration: 0.3,
        x: (x - rect.width / 2) * 0.2,
        y: (y - rect.height / 2) * 0.2,
        ease: "power2.out"
      });

      gsap.to(circle, {
        duration: 0.3,
        left: x,
        top: y,
        scale: 1,
        opacity: 1,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        duration: 0.3,
        x: 0,
        y: 0,
        ease: "power2.out"
      });

      gsap.to(circle, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        ease: "power2.out"
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variants = {
    primary: "bg-charcoal text-cream border border-transparent hover:shadow-xl",
    secondary: "bg-terracotta text-white border border-transparent hover:bg-terracotta-dark",
    outline: "bg-transparent text-charcoal border border-charcoal/30 hover:bg-charcoal hover:text-white"
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300 group flex items-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Background fill animation for hover */}
      <span ref={circleRef} className="absolute w-20 h-20 bg-white/20 rounded-full pointer-events-none transform scale-0 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-overlay" />
      
      {/* Shimmer effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </button>
  );
};

export default Button;