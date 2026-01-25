'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode;
  className?: string;
  showArrows?: boolean;
  showFades?: boolean;
  fadeBackground?: string;
}

export function Carousel({
  children,
  className = '',
  showArrows = true,
  showFades = true,
  fadeBackground = 'rgba(249, 250, 251, 0.95)',
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = 400;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`carousel-wrapper ${className}`}>
      {/* Left fade gradient */}
      {showFades && (
        <div
          className="carousel-fade-left"
          style={{
            opacity: canScrollLeft ? 1 : 0,
            background: `linear-gradient(to right, ${fadeBackground}, transparent)`,
          }}
        />
      )}

      {/* Left arrow */}
      {showArrows && (
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="carousel-arrow carousel-arrow-left"
          aria-label="Scroll left"
        >
          <i className="fa-solid fa-chevron-left text-lg" />
        </button>
      )}

      {/* Scrollable container */}
      <div ref={containerRef} className="carousel-container">
        {children}
      </div>

      {/* Right arrow */}
      {showArrows && (
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="carousel-arrow carousel-arrow-right"
          aria-label="Scroll right"
        >
          <i className="fa-solid fa-chevron-right text-lg" />
        </button>
      )}

      {/* Right fade gradient */}
      {showFades && (
        <div
          className="carousel-fade-right"
          style={{
            opacity: canScrollRight ? 1 : 0,
            background: `linear-gradient(to left, ${fadeBackground}, transparent)`,
          }}
        />
      )}
    </div>
  );
}

export default Carousel;
