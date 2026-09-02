import React from 'react';

export function Maintenance() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] relative overflow-hidden px-6">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4a853]/50 to-transparent opacity-30" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4a853]/50 to-transparent opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        
        {/* Animated Icon / Accent */}
        <div className="w-16 h-16 rounded-full border border-[#d4a853]/30 flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border border-[#d4a853] rounded-full animate-ping opacity-20" />
          <svg className="w-6 h-6 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold mb-6 tracking-tight">
          Site en <span className="text-[#d4a853]">maintenance</span>
        </h1>
        
        <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-10 max-w-lg">
          Nous effectuons actuellement une mise à jour juridique de notre plateforme pour mieux vous servir. Le site sera de retour très prochainement.
        </p>
        
        <div className="inline-flex items-center gap-3 border border-white/10 bg-white/5 px-6 py-3 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#d4a853] animate-pulse" />
          Retour imminent
        </div>
      </div>
      
    </div>
  );
}
