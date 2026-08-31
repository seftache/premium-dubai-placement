"use client";

import React, { useState, useEffect } from "react";

const ads = [
  { src: "/images/pub-ethicalhacker.png", link: "https://ethicalhackerprep.com/" },
  { src: "/images/pub-docuexpress.png", link: "https://docuexpress.site/cv" },
  { src: "/images/pub-gadjico.png", link: "https://gadjico.netlify.app/" },
  { src: "/images/pub-uniquevoyage.png", link: "https://uniquevoyage.site/" },
  { src: "/images/pub-placeholder-1.jpg", link: "https://wa.me/2250545745749" },
  { src: "/images/pub-placeholder-2.jpg", link: "https://wa.me/2250545745749" },
  { src: "/images/pub-placeholder-3.jpg", link: "https://wa.me/2250545745749" },
  { src: "/images/pub-placeholder-4.jpg", link: "https://wa.me/2250545745749" },
  { src: "/images/pub-placeholder-5.jpg", link: "https://wa.me/2250545745749" },
  { src: "/images/pub-placeholder-6.jpg", link: "https://wa.me/2250545745749" },
];

export function AdBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideDuration = 7000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const nextSlide = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };
  
  const prevSlide = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };
  
  const goToSlide = (index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    <section 
      className="ad-banner-section" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ad-banner-section {
          width: 100%;
          aspect-ratio: 21 / 9;
          max-height: 80vh;
          position: relative;
          overflow: hidden;
          overflow-x: hidden;
          background: transparent;
          margin-bottom: 80px;
        }
        .ad-banner-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .ad-slide {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ad-slide.active {
          opacity: 1;
          transform: translateX(0);
        }
        .ad-slide.leaving {
          opacity: 0;
          transform: translateX(-100%);
        }
        .ad-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ad-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          opacity: 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }
        .ad-banner-container:hover .ad-nav-btn { opacity: 1; }
        .ad-nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
        }
        .prev-btn { left: 25px; }
        .next-btn { right: 25px; }
        .ad-indicators {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .indicator.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.6);
        }
        .indicator:hover { background: #818cf8; transform: scale(1.1); }
        .ad-progress {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 3px;
          background: transparent;
          z-index: 10;
        }
        .ad-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef);
          width: 0%;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        .progress-animate {
          animation: progressAnimation 7000ms linear infinite;
        }
        .progress-paused {
          animation-play-state: paused;
        }
        @keyframes progressAnimation {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @media (max-width: 768px) {
          .ad-nav-btn { width: 40px; height: 40px; opacity: 0.7; border-radius: 10px; }
          .ad-indicators { bottom: 15px; padding: 6px 12px; }
          .indicator { width: 10px; height: 10px; }
          .prev-btn { left: 15px; }
          .next-btn { right: 15px; }
        }
        @media (max-width: 480px) {
          .ad-nav-btn { width: 35px; height: 35px; border-radius: 8px; }
          .ad-indicators { bottom: 12px; gap: 8px; }
          .indicator { width: 8px; height: 8px; }
        }
      `}} />

      <div className="ad-banner-container">
        {ads.map((ad, index) => {
          let className = "ad-slide";
          if (index === currentIndex) className += " active";
          else if (index === prevIndex) className += " leaving";
          return (
            <div key={index} className={className}>
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <img src={ad.src} alt={`Publicité ${index + 1}`} className="ad-image" />
              </a>
            </div>
          );
        })}

        <button className="ad-nav-btn prev-btn" onClick={prevSlide}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="ad-nav-btn next-btn" onClick={nextSlide}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="ad-indicators">
          {ads.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>

        <div className="ad-progress">
          <div 
            className={`ad-progress-bar progress-animate ${isPaused ? 'progress-paused' : ''}`} 
            key={currentIndex}
          ></div>
        </div>
      </div>
    </section>
  );
}
