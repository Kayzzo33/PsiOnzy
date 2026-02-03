import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ana S.",
    text: "A Onzy me ajudou a enxergar padrões que eu repetia há anos sem perceber. O ambiente acolhedor fez toda a diferença no meu processo.",
    date: "há 2 semanas"
  },
  {
    name: "Carlos M.",
    text: "Profissional extremamente competente e humana. Sinto que evoluí mais em 6 meses de terapia do que em anos tentando resolver sozinho.",
    date: "há 1 mês"
  },
  {
    name: "Mariana L.",
    text: "Cheguei com crises de ansiedade severas e hoje consigo gerenciar minhas emoções com muito mais leveza. Gratidão eterna.",
    date: "há 3 meses"
  },
  {
    name: "Pedro H.",
    text: "Sempre fui cético com terapia, mas a abordagem dela é muito prática e acolhedora. Mudou minha perspectiva.",
    date: "há 1 semana"
  }
];

const Depoimentos: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee Animation
      if (marqueeRef.current) {
        const width = marqueeRef.current.scrollWidth;
        gsap.to(marqueeRef.current, {
          x: -width / 2,
          duration: 40, // Slower for readability
          ease: "none",
          repeat: -1
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Rounded corners, margins, no blur
    <section id="depoimentos" ref={sectionRef} className="py-24 bg-cream overflow-hidden relative rounded-[3rem] mx-2 md:mx-4 my-2 shadow-sm">
      
      <div className="container mx-auto px-6 mb-16 relative z-10 pt-10">
        <div className="flex items-center gap-4 mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-8 h-8" />
            <div className="flex text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-charcoal/60 font-medium">5.0 de 5 estrelas</span>
        </div>
        <SectionTitle 
          subtitle="Avaliações" 
          title="O que dizem os pacientes" 
        />
      </div>

      <div className="relative w-full z-10">
        {/* Side Gradients for Fade Effect (Internal to section, kept for marquee readability) */}
        <div className="absolute left-0 top-0 h-full w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

        {/* Marquee Container */}
        <div className="flex overflow-hidden pb-12">
          <div ref={marqueeRef} className="flex gap-6 px-6">
            {/* Double the array to create seamless loop */}
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-[320px] bg-white p-6 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                            {t.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                            <span className="text-xs text-gray-500">{t.date}</span>
                        </div>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-5 h-5 opacity-50" />
                </div>
                
                <div className="flex text-yellow-400 mb-3 gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>

                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Depoimentos;