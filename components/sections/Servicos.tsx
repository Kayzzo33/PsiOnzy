import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import { Brain, Heart, Users, Globe, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    icon: <Brain className="w-8 h-8" />,
    title: "Terapia Individual",
    description: "Espaço seguro para tratar ansiedade, depressão e questões existenciais.",
    tags: ["Ansiedade", "Depressão", "Carreira"]
  },
  {
    id: "02",
    icon: <Users className="w-8 h-8" />,
    title: "Terapia de Casal",
    description: "Mediação de conflitos e melhoria da comunicação afetiva.",
    tags: ["Relacionamento", "Conflitos", "Diálogo"]
  },
  {
    id: "03",
    icon: <Globe className="w-8 h-8" />,
    title: "Atendimento Online",
    description: "Psicoterapia acessível de onde você estiver, com total sigilo.",
    tags: ["Flexibilidade", "Segurança", "Videochamada"]
  },
  {
    id: "04",
    icon: <Heart className="w-8 h-8" />,
    title: "Autoconhecimento",
    description: "Jornada profunda para entender seus padrões e desejos.",
    tags: ["Autoestima", "Propósito", "Emoções"]
  }
];

const Servicos: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Entry with explicit opacity set
      const cards = gridRef.current?.children;
      if (cards) {
          gsap.fromTo(cards, 
            { y: 100, opacity: 0 },
            {
                scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%", // Triggers earlier to avoid black void
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out"
            }
          );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Rounded corners, margins, no blur
    <section id="servicos" ref={sectionRef} className="py-24 bg-charcoal text-cream relative rounded-[3rem] mx-2 md:mx-4 my-2 shadow-sm overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <SectionTitle 
            subtitle="Minhas Abordagens" 
            title="Como posso te ajudar" 
            dark
            className="mb-0"
          />
          <p className="text-cream/60 max-w-sm mt-6 md:mt-0 text-right md:text-left hidden md:block">
            Metodologias adaptadas para sua necessidade, com foco no seu bem-estar e evolução pessoal.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:border-terracotta/50"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-terracotta/10 rounded-xl text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <span className="font-serif text-4xl text-white/10 font-bold group-hover:text-white/20 transition-colors">
                  {service.id}
                </span>
              </div>
              
              <h3 className="text-3xl font-serif text-cream mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>
              
              <p className="text-cream/60 font-sans text-lg leading-relaxed mb-8 max-w-md">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs uppercase tracking-wider text-cream/50 group-hover:border-terracotta/30 group-hover:text-terracotta transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Icon */}
              <div className="absolute top-8 right-8 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="text-terracotta w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicos;