import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power4.inOut"
      })
      .from(imageRef.current, {
        scale: 1.05, 
        duration: 3, 
        ease: "power2.out"
      }, "-=1.2")
      .from(textRef.current?.querySelectorAll(".hero-text-anim"), {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=2.0");

      // Parallax Effect
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        } 
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Full width (no mx), margin top removed to sit flush
    <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-cream flex items-center justify-center pt-20 md:pt-0 rounded-b-[3rem] shadow-sm">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[3rem]">
        <img 
          ref={imageRef}
          src="https://res.cloudinary.com/ddxo3s8an/image/upload/v1770126901/3228d096194489.5ea8d0efa8e09_f4nodu.jpg" 
          alt="Vista da Cidade com Pôr do Sol" 
          className="w-full h-[115%] object-cover object-center"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/10" />
        <div className="absolute inset-0 bg-black/10" /> 
      </div>

      {/* Reveal Overlay (Initial Load) */}
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal z-50 pointer-events-none rounded-b-[3rem]" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div ref={textRef} className="md:col-span-10 md:col-start-2 text-center md:text-left">
          <h2 className="hero-text-anim font-sans font-medium text-cream/90 tracking-[0.2em] uppercase mb-6 text-sm md:text-base inline-block border-b border-terracotta/80 pb-2 drop-shadow-md">
            Psicologia Clínica & Psicanálise
          </h2>
          <h1 className="hero-text-anim font-serif text-5xl md:text-7xl lg:text-9xl text-white leading-[0.9] mb-8 tracking-tighter drop-shadow-lg">
            Espaço de <span className="italic font-light text-terracotta/90">Escuta</span> <br />
            & Transformação
          </h1>
          <p className="hero-text-anim text-lg md:text-2xl text-cream/90 max-w-2xl leading-relaxed mb-10 md:ml-0 mx-auto font-light drop-shadow-md">
            Um ambiente seguro para desconstruir angústias e reconstruir caminhos. Atendimento presencial e online para quem busca se reencontrar.
          </p>
          <div className="hero-text-anim flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <Button onClick={handleScrollToContact} icon>Agende sua Sessão</Button>
            <Button variant="outline" className="text-white border-white/50 hover:bg-white hover:text-charcoal" onClick={() => window.open('https://wa.me/5511999999999', '_blank')}>
              Conversar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;