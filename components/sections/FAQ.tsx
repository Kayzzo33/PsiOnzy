import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionTitle from '../ui/SectionTitle';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Como funciona a primeira sessão?",
    answer: "A primeira sessão é um momento de conhecimento mútuo. Vamos conversar sobre o que te trouxe à terapia, suas expectativas e como funciona meu método de trabalho. É um espaço livre de julgamentos para você se sentir à vontade."
  },
  {
    question: "Aceita convênios?",
    answer: "Atendo apenas na modalidade particular para garantir a qualidade e a duração adequada das sessões. No entanto, emito recibo para que você possa solicitar reembolso junto ao seu convênio."
  },
  {
    question: "Qual a diferença entre online e presencial?",
    answer: "A eficácia é a mesma. O atendimento online oferece comodidade e economia de tempo, sendo realizado por videochamada em plataforma segura. O presencial ocorre em meu consultório. A escolha depende da sua preferência e rotina."
  },
  {
    question: "Qual a duração e frequência das sessões?",
    answer: "As sessões duram 50 minutos e, geralmente, ocorrem uma vez por semana. A frequência pode ser ajustada dependendo da necessidade clínica avaliada caso a caso."
  }
];

const AccordionItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-charcoal/10">
      <button 
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left hover:text-terracotta transition-colors group"
      >
        <span className="text-xl font-serif text-charcoal group-hover:text-terracotta">{question}</span>
        <span className="text-terracotta ml-4">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden opacity-0"
      >
        <p className="pb-8 text-charcoal/70 font-sans leading-relaxed max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // Rounded corners, margins, no blur
    <section id="faq" className="py-24 bg-white relative rounded-[3rem] mx-2 md:mx-4 my-2 shadow-sm overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 pt-10">
        <SectionTitle 
          subtitle="Dúvidas" 
          title="Perguntas Frequentes" 
          className="mb-16"
        />
        
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;