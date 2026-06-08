"use client";

export function SharedBackgroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden z-0">
      
      {/* ── FIXED BACKGROUND (Waterfront) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/dubai-waterfront.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Light overlay for text readability without killing the vibrant colors */}
        <div className="absolute inset-0 bg-brand-black/45" />
      </div>
      
      {/* ── FADES FOR SEAMLESS TRANSITIONS ── */}
      {/* Fade FROM Hero to Image */}
      <div className="absolute top-0 inset-x-0 h-[300px] sm:h-[400px] z-[2] bg-gradient-to-b from-brand-black via-brand-black/90 to-transparent pointer-events-none" />
      
      {/* Fade FROM Waterfront Image TO White Carousel */}
      <div className="absolute bottom-0 inset-x-0 h-[100px] sm:h-[150px] z-[2] bg-gradient-to-t from-white to-white/0 pointer-events-none" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}

export function SharedBackgroundLayoutMarina({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden z-0">
      
      {/* ── FIXED BACKGROUND (Marina) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/dubai-marina.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Light overlay for text readability without killing the vibrant colors */}
        <div className="absolute inset-0 bg-brand-black/45" />
      </div>
      
      {/* ── FADES FOR SEAMLESS TRANSITIONS ── */}
      {/* Fade FROM White Carousel TO Marina Image */}
      <div className="absolute top-0 inset-x-0 h-[100px] sm:h-[150px] z-[2] bg-gradient-to-b from-white to-white/0 pointer-events-none" />
      
      {/* Fade FROM Image TO Footer */}
      <div className="absolute bottom-0 inset-x-0 h-[150px] sm:h-[250px] z-[2] bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent pointer-events-none" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
