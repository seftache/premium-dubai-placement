"use client";

import React, { useState, useEffect } from "react";

const images = [
  "/images/pub1.jpg",
  "/images/pub2.jpg",
  "/images/pub3.jpg",
  "/images/pub4.jpg",
  "/images/pub5.jpg",
  "/images/pub6.jpg",
  "/images/pub7.jpg",
  "/images/pub8.jpg",
  "/images/pub9.jpg",
  "/images/pub10.jpg",
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
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const nextSlide = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
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
      style={{ marginTop: "-1px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .ad-banner-section {
          height: 500px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(168, 85, 247, 0.15) 100%);
          border-top: 1px solid rgba(99, 102, 241, 0.3);
          border-bottom: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .ad-banner-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.8) 50%, transparent 100%);
          z-index: 2;
        }
        .ad-banner-section::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.8) 50%, transparent 100%);
          z-index: 2;
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
          width: 100%; height: 4px;
          background: rgba(255, 255, 255, 0.15);
          z-index: 10;
          backdrop-filter: blur(5px);
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
          .ad-banner-section { height: 320px; }
          .ad-nav-btn { width: 40px; height: 40px; opacity: 0.7; border-radius: 10px; }
          .ad-indicators { bottom: 15px; padding: 6px 12px; }
          .indicator { width: 10px; height: 10px; }
          .prev-btn { left: 15px; }
          .next-btn { right: 15px; }
        }
        @media (max-width: 480px) {
          .ad-banner-section { height: 270px; }
          .ad-nav-btn { width: 35px; height: 35px; border-radius: 8px; }
          .ad-indicators { bottom: 12px; gap: 8px; }
          .indicator { width: 8px; height: 8px; }
        }
      `}} />

      <div className="ad-banner-container">
        {images.map((src, index) => {
          let className = "ad-slide";
          if (index === currentIndex) className += " active";
          else if (index === prevIndex) className += " leaving";
          return (
            <div key={index} className={className}>
              <img src={src} alt={`Publicité ${index + 1}`} className="ad-image" />
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
          {images.map((_, index) => (
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
