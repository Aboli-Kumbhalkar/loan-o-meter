'use client';

import { useState, useRef, useEffect } from 'react';

interface LoanTypeCarouselProps {
  selectedType: 'personal' | 'vehicle' | 'home' | 'business';
  onTypeChange: (type: 'personal' | 'vehicle' | 'home' | 'business') => void;
}

export default function LoanTypeCarousel({ selectedType, onTypeChange }: LoanTypeCarouselProps) {
  const loanTypes = [
    { id: 'personal', label: 'Personal', icon: '👤', description: 'For personal expenses' },
    { id: 'vehicle', label: 'Vehicle', icon: '🚗', description: 'For cars & bikes' },
    { id: 'home', label: 'Home', icon: '🏠', description: 'For house purchase' },
    { id: 'business', label: 'Business', icon: '💼', description: 'For business needs' }
  ] as const;

  const [currentIndex, setCurrentIndex] = useState(() => 
    loanTypes.findIndex(type => type.id === selectedType)
  );
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Update current index when selectedType changes externally
  useEffect(() => {
    const newIndex = loanTypes.findIndex(type => type.id === selectedType);
    setCurrentIndex(newIndex >= 0 ? newIndex : 1); // Default to vehicle (index 1)
  }, [selectedType]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentIndex < loanTypes.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        onTypeChange(loanTypes[nextIndex].id);
      } else if (diffX < 0 && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        onTypeChange(loanTypes[prevIndex].id);
      }
    }
    
    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onTypeChange(loanTypes[index].id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl font-semibold">Select your loan type</h2>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Main Carousel Track */}
        <div 
          className="flex items-center justify-center gap-4 py-6 px-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Card (if exists) */}
          {currentIndex > 0 && (
            <div 
              onClick={() => goToSlide(currentIndex - 1)}
              className="flex-shrink-0 w-20 h-24 bg-white/8 border border-white/10 rounded-lg cursor-pointer opacity-60 scale-90 transition-all duration-300 hover:opacity-80"
            >
              <div className="flex flex-col items-center justify-center h-full p-2">
                <div className="text-lg mb-1">{loanTypes[currentIndex - 1].icon}</div>
                <span className="text-white text-xs font-medium text-center leading-tight">
                  {loanTypes[currentIndex - 1].label}
                </span>
              </div>
            </div>
          )}

          {/* Active/Center Card */}
          <div className="flex-shrink-0 w-44 h-32 bg-white/15 border border-white/30 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 mx-2">
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="text-3xl mb-2">{loanTypes[currentIndex].icon}</div>
              <h3 className="text-white text-lg font-semibold mb-1 text-center">
                {loanTypes[currentIndex].label}
              </h3>
              <p className="text-white/70 text-xs text-center leading-tight">
                {loanTypes[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Next Card (if exists) */}
          {currentIndex < loanTypes.length - 1 && (
            <div 
              onClick={() => goToSlide(currentIndex + 1)}
              className="flex-shrink-0 w-20 h-24 bg-white/8 border border-white/10 rounded-lg cursor-pointer opacity-60 scale-90 transition-all duration-300 hover:opacity-80"
            >
              <div className="flex flex-col items-center justify-center h-full p-2">
                <div className="text-lg mb-1">{loanTypes[currentIndex + 1].icon}</div>
                <span className="text-white text-xs font-medium text-center leading-tight">
                  {loanTypes[currentIndex + 1].label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Subtle gradient overlays */}
        <div className="absolute left-0 top-0 w-6 h-full bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-6 h-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {loanTypes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}