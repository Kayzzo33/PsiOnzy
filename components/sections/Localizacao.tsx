import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { MapPin, X, Navigation, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const officeImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop", // Wide
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Detail
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"  // Detail 2
];

const Localizacao: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(bgImageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Card Stagger
      gsap.from(containerRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % officeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + officeImages.length) % officeImages.length);
  };

  return (
    // Full width (no mx), margin removed (no my)
    <section ref={sectionRef} className="relative py-32 overflow-hidden flex items-center justify-center min-h-[90vh] w-full rounded-[3rem] shadow-sm mt-4">
        {/* 
            Background
        */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
            <img 
                ref={bgImageRef}
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
                alt="Consultório" 
                className="w-full h-[120%] object-cover object-center brightness-[0.4]"
            />
            {/* Dark overlay to ensure text contrast */}
            <div className="absolute inset-0 bg-charcoal/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center mb-16 text-center">
                <SectionTitle 
                    subtitle="Localização" 
                    title="Conheça nosso espaço" 
                    dark
                    className="mb-0"
                />
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                
                {/* Left Card: Gallery Carousel */}
                <div className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                    <div className="absolute inset-0">
                        <img 
                            src={officeImages[currentImageIndex]} 
                            alt={`Consultório view ${currentImageIndex + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />
                    </div>
                    {/* Controls */}
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={prevImage} className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={nextImage} className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-white" />
                        <span className="text-xs font-medium text-white tracking-wide">GALERIA DE FOTOS</span>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {officeImages.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Card: Location Info */}
                <div className="h-[400px] md:h-[500px] bg-charcoal/60 backdrop-blur-xl p-10 md:p-14 rounded-3xl shadow-2xl border border-white/10 flex flex-col justify-center relative overflow-hidden text-cream">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h3 className="font-serif text-3xl text-white mb-6">Um refúgio no meio da cidade</h3>
                        
                        <p className="text-white/80 text-lg mb-10 font-light leading-relaxed">
                            Ambiente climatizado, isolamento acústico e uma decoração pensada para trazer calma e conforto durante sua sessão.
                        </p>

                        <div className="space-y-6 mb-10">
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                <MapPin className="text-terracotta w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-serif text-xl font-bold text-white">Edifício Paulista Corporate</h4>
                                    <p className="text-white/60 text-sm">Av. Paulista, 1000 - Cj 123</p>
                                    <p className="text-white/60 text-sm">Bela Vista, São Paulo - SP</p>
                                </div>
                            </div>
                        </div>

                        <Button onClick={toggleModal} className="w-full justify-center bg-white text-charcoal hover:bg-terracotta hover:text-white border-0">
                            Ver no Mapa
                        </Button>
                    </div>
                </div>

            </div>
        </div>

        {/* Modal Map */}
        {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={toggleModal} />
                
                <div className="bg-cream w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden relative shadow-2xl animate-[shimmer_0.5s_ease-out]">
                    <button 
                        onClick={toggleModal}
                        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-charcoal hover:text-terracotta transition-colors shadow-lg"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-full h-full relative bg-gray-200 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-23.561684,-46.655981&zoom=15&size=1000x800&maptype=roadmap&style=feature:all|saturation:-100|lightness:30&key=YOUR_API_KEY_HERE')] bg-cover bg-center grayscale opacity-80" />
                        
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/2275px-Google_Maps_Logo_2020.svg.png" 
                            className="absolute bottom-4 left-4 w-16 opacity-50" 
                            alt="Google Maps"
                        />
                        
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-12 h-12 bg-terracotta rounded-full border-4 border-white flex items-center justify-center shadow-xl animate-bounce">
                                <MapPin className="text-white w-6 h-6" />
                            </div>
                            <div className="bg-white px-4 py-2 rounded-lg shadow-lg mt-2 text-charcoal font-bold text-sm">
                                Onzy Psi
                            </div>
                        </div>

                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Av.+Paulista,+1000+-+Bela+Vista,+São+Paulo+-+SP" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                        >
                            <Navigation className="w-4 h-4" />
                            Abrir no Google Maps
                        </a>
                    </div>
                </div>
            </div>
        )}
    </section>
  );
};

export default Localizacao;