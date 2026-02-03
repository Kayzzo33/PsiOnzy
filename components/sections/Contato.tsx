import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contato: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, message } = formData;
    
    // Validate
    if(!name || !phone) {
        alert("Por favor, preencha pelo menos nome e telefone.");
        return;
    }

    const text = `Olá! Meu nome é *${name}* (${phone}).\n\n${message ? message : 'Gostaria de agendar uma sessão.'}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".contact-anim", {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out"
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Rounded corners, margins, no blur
    <section id="contato" ref={sectionRef} className="py-24 bg-charcoal text-cream relative overflow-hidden rounded-[3rem] mx-2 md:mx-4 my-2 shadow-sm">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-terracotta/5 rounded-l-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info */}
          <div className="contact-anim">
            <SectionTitle 
              subtitle="Contato" 
              title="Vamos conversar?" 
              dark 
            />
            <p className="text-cream/70 mb-12 text-xl font-light leading-relaxed">
              Dê o primeiro passo em direção ao seu bem-estar. Preencha o formulário e você será direcionado para iniciar uma conversa no WhatsApp.
            </p>

            <div className="space-y-10">
              <div className="group flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-1">WhatsApp</h4>
                  <p className="text-cream/60 group-hover:text-cream transition-colors">(11) 99999-9999</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-1">Email</h4>
                  <p className="text-cream/60 group-hover:text-cream transition-colors">contato@onzypsi.com.br</p>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl text-terracotta group-hover:bg-terracotta group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl mb-1">Consultório</h4>
                  <p className="text-cream/60 mb-2">Av. Paulista, 1000 - São Paulo/SP</p>
                  <span className="inline-block px-3 py-1 bg-terracotta/20 text-terracotta rounded-full text-xs font-bold tracking-wider">ONLINE & PRESENCIAL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-anim">
            <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
               {/* Shine Effect */}
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />

              <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-cream/40 pl-1">Seu Nome</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-cream placeholder-cream/20 focus:border-terracotta focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="Digite seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest text-cream/40 pl-1">Seu Telefone</label>
                  <input 
                    type="tel" 
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-cream placeholder-cream/20 focus:border-terracotta focus:bg-white/10 focus:outline-none transition-all duration-300"
                    placeholder="(DDD) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-cream/40 pl-1">Sua Mensagem</label>
                  <textarea 
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-cream placeholder-cream/20 focus:border-terracotta focus:bg-white/10 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Como posso te ajudar?"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full justify-center text-center">
                    Enviar para WhatsApp <Send className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-center text-xs text-cream/30 mt-4">
                    Seus dados estão seguros e não serão compartilhados.
                  </p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contato;