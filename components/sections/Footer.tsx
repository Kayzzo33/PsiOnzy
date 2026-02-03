import React from 'react';

const Footer: React.FC = () => {
  return (
    // Rounded top, smaller radius (2rem), full width
    <footer className="bg-stone py-12 border-t border-white/10 text-cream/60 rounded-t-[2rem] w-full mt-4">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl text-cream mb-1">Onzy Psi</h2>
          <p className="text-sm">Psicologia Clínica</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <a href="#sobre" className="hover:text-terracotta transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-terracotta transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-terracotta transition-colors">Contato</a>
        </div>

        <div className="text-center md:text-right text-xs space-y-1">
          <p>CRP 06/123456</p>
          <p>&copy; {new Date().getFullYear()} Onzy Psi. Todos os direitos reservados.</p>
          <p className="text-cream/30 pt-2">Desenvolvido por <span className="text-terracotta">jKayzz</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;