import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';

// Components
import Hero from './components/sections/Hero';
import Sobre from './components/sections/Sobre';
import Servicos from './components/sections/Servicos';
import Depoimentos from './components/sections/Depoimentos';
import Localizacao from './components/sections/Localizacao'; // New Section
import FAQ from './components/sections/FAQ';
import Contato from './components/sections/Contato';
import Footer from './components/sections/Footer';

// Register GSAP Global
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Refs for Physics Animation
  const navRef = useRef<HTMLDivElement>(null);
  const glassSurfaceRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  // Physics Animation Loop
  useLayoutEffect(() => {
    let currentScroll = window.scrollY;
    let skewStrength = 0;
    let requestID: number;
    const scrollThreshold = 50;

    const animate = () => {
      const scrollY = window.scrollY;
      
      // 1. Logic for Capsule State
      if (navRef.current) {
        if (scrollY > scrollThreshold) {
          navRef.current.classList.add('capsule-active');
        } else {
          navRef.current.classList.remove('capsule-active');
        }
      }

      // 2. Liquid Physics Logic
      const velocity = scrollY - currentScroll;
      currentScroll = scrollY;

      // Calculate distortion target based on velocity
      const targetSkew = Math.max(Math.min(velocity * 0.15, 6), -6);
      
      // Lerp for smooth inertia
      skewStrength = skewStrength + (targetSkew - skewStrength) * 0.1;
      
      // Calculate stretch based on skew
      const stretch = 1 + (Math.abs(skewStrength) * 0.02);

      // Apply transforms
      if (glassSurfaceRef.current) {
        const contentSkew = scrollY > scrollThreshold ? skewStrength : 0;
        glassSurfaceRef.current.style.transform = `skewY(${contentSkew}deg) scaleY(${stretch})`;
      }

      requestID = requestAnimationFrame(animate);
    };

    requestID = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestID);
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      
      tl.to(menuRef.current, {
        x: '0%',
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .from(menuItemsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power3.out'
      }, "-=0.4");
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen bg-[#EBEAE6] text-charcoal selection:bg-terracotta selection:text-white relative w-full overflow-x-hidden">
      
      {/* Global Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* NAVIGATION CONTAINER */}
      <div className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none pt-6">
        <nav 
          ref={navRef}
          className="pointer-events-auto transition-all duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) flex items-center justify-center bg-transparent w-full max-w-7xl px-8"
        >
          {/* Internal Surface (Distorts with Physics) */}
          <div 
            ref={glassSurfaceRef} 
            className="w-full h-full flex items-center justify-between transition-transform duration-100 ease-linear origin-center py-3"
          >
            {/* Logo */}
            <a href="#" className="font-serif text-2xl font-bold tracking-tight text-charcoal z-50 mix-blend-difference md:mix-blend-normal relative group mr-1 md:mr-2">
              Onzy<span className="text-terracotta font-normal italic group-hover:text-terracotta-dark transition-colors">Psi</span>
            </a>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {['Sobre', 'Servicos', 'Depoimentos'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-xs uppercase tracking-widest font-medium text-charcoal/90 hover:text-terracotta transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-terracotta transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <a 
                href="#contato" 
                className="ml-1 px-5 py-2.5 bg-charcoal text-cream rounded-full text-xs uppercase tracking-widest hover:bg-terracotta hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Agendar
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden text-charcoal p-2 focus:outline-none z-50 pointer-events-auto">
               <Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </div>

      <style jsx>{`
        /* Capsule State Styles applied via JS class */
        .capsule-active {
          margin-top: 12px !important;
          /* Much tighter width to bring elements closer */
          max-width: 550px !important; 
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          
          /* Visuals */
          background: rgba(255, 255, 255, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 9999px !important;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08) !important;
          backdrop-filter: blur(12px);
        }
      `}</style>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-cream z-[110] translate-x-full flex flex-col justify-center items-center md:hidden"
      >
        <button onClick={toggleMenu} className="absolute top-8 right-8 p-2 text-charcoal hover:rotate-90 transition-transform duration-300">
          <X className="w-10 h-10" />
        </button>

        <div ref={menuItemsRef} className="flex flex-col gap-8 text-center">
          <a href="#hero" onClick={closeMenu} className="font-serif text-4xl text-charcoal hover:text-terracotta transition-colors">Início</a>
          <a href="#sobre" onClick={closeMenu} className="font-serif text-4xl text-charcoal hover:text-terracotta transition-colors">Sobre</a>
          <a href="#servicos" onClick={closeMenu} className="font-serif text-4xl text-charcoal hover:text-terracotta transition-colors">Serviços</a>
          <a href="#depoimentos" onClick={closeMenu} className="font-serif text-4xl text-charcoal hover:text-terracotta transition-colors">Depoimentos</a>
          <a href="#contato" onClick={closeMenu} className="font-serif text-4xl text-terracotta hover:text-charcoal transition-colors italic">Agendar</a>
        </div>
      </div>

      {/* Page Content - Removed gap container to handle margins individually */}
      <div className="flex flex-col w-full">
        <div id="hero"><Hero /></div>
        {/* Added wrapper div for spacing on card sections */}
        <div className="flex flex-col gap-2 pb-4"> 
          <div id="sobre"><Sobre /></div>
          <div id="servicos"><Servicos /></div>
          <div id="depoimentos"><Depoimentos /></div>
        </div>
        <div id="localizacao"><Localizacao /></div>
        {/* Wrapper for FAQ and Contato */}
        <div className="flex flex-col gap-2 pb-4">
          <div id="faq"><FAQ /></div>
          <div id="contato"><Contato /></div>
        </div>
      </div>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-white stroke-none">
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.418.249-.697.249-1.294.175-1.418-.074-.125-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.07 0C5.537 0 .226 5.306.223 11.821c0 2.083.543 4.118 1.575 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.316 11.893-11.849.002-3.163-1.232-6.137-3.473-8.372"/>
        </svg>
      </a>
    </main>
  );
}

export default App;