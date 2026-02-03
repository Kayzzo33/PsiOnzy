import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const Sobre: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Section Entry Animation (Requested Fix)
      gsap.from(sectionRef.current, {
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", 
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Image Parallax Reveal
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Text Reveal (Paragraphs)
      const paragraphs = contentRef.current?.querySelectorAll("p:not(.quote-text)");
      if (paragraphs) {
        gsap.from(paragraphs, {
            scrollTrigger: {
                trigger: contentRef.current,
                start: "top 75%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
      }

      // Quote Reveal (Swipe effect)
      if (quoteContainerRef.current) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: quoteContainerRef.current,
                start: "top 80%",
            }
        });
        
        // Border height grow
        tl.fromTo(quoteContainerRef.current, 
            { borderLeftColor: "transparent" },
            { borderLeftColor: "#C06C58", duration: 0.2 }
        )
        .fromTo(quoteTextRef.current,
            { clipPath: "polygon(0 0, 0 100%, 0 100%, 0 0)", opacity: 0 },
            { clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)", opacity: 1, duration: 1.5, ease: "power4.out" }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Rounded corners, margins to create card effect, no blur
    <section id="sobre" ref={sectionRef} className="py-24 md:py-32 bg-cream relative overflow-hidden rounded-[3rem] mx-2 md:mx-4 my-2 shadow-sm">
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Side - Premium Styling */}
          <div className="relative order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4]">
              {/* Organic/Geometric Decor */}
              <div className="absolute -inset-4 border border-terracotta/30 rounded-[2rem] z-0 transform rotate-3" />
              <div className="absolute -inset-4 border border-charcoal/10 rounded-[2rem] z-0 transform -rotate-2" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-10">
                <img 
                  ref={imageRef}
                  src="https://res.cloudinary.com/ddxo3s8an/image/upload/v1769904874/Design_sem_nome_54_qftd1a.png" 
                  alt="Onzy Psi" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <SectionTitle 
              subtitle="Quem sou eu" 
              title="Acolhimento além das palavras." 
            />
            
            <div className="space-y-6 text-charcoal/80 text-lg md:text-xl leading-relaxed font-sans font-light">
              <p>
                Olá, sou a Onzy. Minha prática clínica é fundamentada na crença de que cada indivíduo carrega um universo único de experiências. Não acredito em fórmulas mágicas, mas sim no poder da escuta ativa e na construção conjunta de novos significados.
              </p>
              <p>
                Com formação em Psicologia Clínica e especialização em Psicanálise, dedico minha carreira a auxiliar pessoas a navegarem por momentos de ansiedade, transição e autodescoberta. Meu consultório é um espaço livre de julgamentos.
              </p>
              
              {/* Animated Quote */}
              <div 
                ref={quoteContainerRef} 
                className="pt-4 pl-6 my-8 border-l-4 border-terracotta"
              >
                <p ref={quoteTextRef} className="quote-text font-serif text-2xl italic text-terracotta-dark leading-snug">
                  "O autoconhecimento não é um destino, mas uma jornada contínua de coragem e acolhimento."
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="h-[1px] flex-1 bg-charcoal/20"></div>
                <span className="font-sans text-sm tracking-widest uppercase text-charcoal/50">CRP 06/XXXXX</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sobre;