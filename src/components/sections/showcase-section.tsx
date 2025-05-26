"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const showcaseItems = [
  {
    id: 1,
    title: "Neural Interface",
    description: "Seamlessly connect with the future of human-computer interaction through our advanced neural interface technology.",
    imageSrc: "https://placehold.co/800x500/1e3a8a/ffffff.png?text=Neural+Interface",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "AI-Powered Insights",
    description: "Unlock powerful insights with our cutting-edge AI algorithms that learn and adapt to your unique patterns.",
    imageSrc: "https://placehold.co/800x500/4338ca/ffffff.png?text=AI+Insights",
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: 3,
    title: "Knowledge Transfer",
    description: "Experience accelerated learning through neural interfaces with our state-of-the-art knowledge transfer system.",
    imageSrc: "https://placehold.co/800x500/4a235a/ffffff.png?text=Knowledge+Transfer",
    color: "from-purple-500 to-pink-600",
    boxContent: "Coming Soon"
  }
];

export default function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, showcaseItems.length);
  }, []);

  // Handle scroll events with debounce
  const handleScroll = useCallback(() => {
    if (isScrolling.current) return;
    
    const section = sectionRef.current;
    if (!section) return;

    const items = itemRefs.current.filter(Boolean);
    if (items.length === 0) return;

    // Calculate viewport thresholds
    const viewportTop = window.scrollY + 150; // Account for header
    const viewportBottom = viewportTop + window.innerHeight - 200; // Account for potential footer
    
    let newActiveIndex = 0;
    let maxVisibleArea = 0;
    
    items.forEach((item, index) => {
      if (!item) return;
      
      const rect = item.getBoundingClientRect();
      const itemTop = window.scrollY + rect.top;
      const itemBottom = itemTop + rect.height;
      
      // Calculate visible area
      const visibleTop = Math.max(viewportTop, itemTop);
      const visibleBottom = Math.min(viewportBottom, itemBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      
      // Update if this item has more visible area than current max
      if (visibleHeight > maxVisibleArea) {
        maxVisibleArea = visibleHeight;
        newActiveIndex = index;
      }
    });
    
    // Update active index if changed
    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  }, [activeIndex]);

  // Set up scroll and resize listeners with throttling
  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScrollWithThrottle = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check with a small delay to ensure DOM is ready
    const initTimer = setTimeout(handleScroll, 100);
    
    // Use passive: true for better scroll performance
    window.addEventListener('scroll', handleScrollWithThrottle, { passive: true });
    
    // Also check on resize
    const handleResize = () => {
      handleScroll();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScrollWithThrottle);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    };
  }, [handleScroll]);

  // Scroll to a specific showcase item
  const scrollToIndex = useCallback((index: number) => {
    if (index < 0 || index >= showcaseItems.length) return;
    
    const targetElement = itemRefs.current[index];
    if (!targetElement) return;
    
    // Set scrolling state and update active index immediately
    isScrolling.current = true;
    setActiveIndex(index);
    
    // Calculate scroll position with header offset
    const headerOffset = 120; // Account for fixed header
    const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - headerOffset;
    
    // First jump to the approximate position
    window.scrollTo({
      top: offsetPosition,
      behavior: 'auto'
    });
    
    // Then do a smooth scroll to handle any remaining offset
    requestAnimationFrame(() => {
      const finalPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
    });

    // Reset scrolling state after animation completes
    const timer = setTimeout(() => {
      isScrolling.current = false;
    }, 1000);

    return () => {
      clearTimeout(timer);
      isScrolling.current = false;
    };
  }, []);

  // Handle dot navigation click
  const handleDotClick = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't do anything if clicking the current active dot
    if (index === activeIndex) return;
    
    // Update active index immediately for better UX
    setActiveIndex(index);
    
    // Use the scrollToIndex function which handles the scrolling
    scrollToIndex(index);
  }, [activeIndex, scrollToIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-[#0c1018] to-[#060a12] min-h-screen"
    >
      {/* Fixed dots navigation */}
      <div className="fixed left-6 md:left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-5">
        {showcaseItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button 
              key={item.id}
              onClick={(e) => handleDotClick(index, e)}
              aria-label={`View ${item.title}`}
              className="relative flex items-center justify-center w-6 h-14 transition-all duration-300 group outline-none focus:outline-none"
              aria-current={isActive ? 'step' : undefined}
            >
              <span 
                className={`absolute w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-500 scale-125 ring-2 ring-blue-400 ring-opacity-50' 
                    : 'bg-white/30 group-hover:bg-blue-400/70 group-hover:scale-125 group-focus:bg-blue-400/70 group-focus:scale-125'
                }`}
                aria-hidden="true"
              />
              <span 
                className={`absolute w-0.5 h-8 rounded-full transition-all duration-300 origin-center ${
                  isActive 
                    ? 'bg-gradient-to-b from-blue-500 to-blue-400 scale-y-100' 
                    : 'bg-white/20 scale-y-0 group-hover:scale-y-50 group-focus:scale-y-50'
                }`}
                style={{
                  top: isActive ? '-24px' : '0px',
                  height: isActive ? '48px' : '0px',
                }}
                aria-hidden="true"
              />
              <span className={cn(
                'absolute left-8 w-32 text-sm font-medium transition-opacity duration-300 text-left',
                'opacity-0 group-hover:opacity-100 group-focus:opacity-100',
                isActive ? 'text-blue-300' : 'text-white/70',
                'flex items-center gap-2 group'
              )}>
                {item.title}
                {item.boxContent && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white/60 border border-white/10 group-hover:border-white/20 transition-colors">
                    {item.boxContent}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Showcase
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the future of knowledge acquisition
          </p>
          
          {/* Mobile dots navigation */}
          <div className="flex justify-center mt-8 space-x-4 lg:hidden">
            {showcaseItems.map((item, index) => (
              <button 
                key={item.id}
                onClick={(e) => handleDotClick(index, e)}
                aria-label={`View ${item.title}`}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-500 scale-125 ring-2 ring-blue-400 ring-opacity-50' 
                    : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                }`}
              >
                <span className="sr-only">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Showcase items */}
        <div className="space-y-0 pb-24">
          {showcaseItems.map((item, index) => (
            <div 
              key={item.id}
              ref={el => {
                if (el) itemRefs.current[index] = el;
              }}
              className={cn(
                'relative transform transition-all duration-500 ease-out py-24',
                'min-h-screen flex flex-col justify-center',
                'opacity-100', // Always keep items visible
                'pointer-events-auto', // Always allow interaction
                'first:pt-0 last:pb-0' // Remove extra padding from first and last items
              )}
              style={{
                scrollMarginTop: '120px', // Ensure space for fixed header
                scrollSnapAlign: 'start', // Enable snap scrolling
                transform: `translateY(${index === activeIndex ? '0' : '20px'})`,
                opacity: index === activeIndex ? 1 : 0.3,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents: 'auto'
              }}
              id={`showcase-${item.id}`}
              data-index={index}
            >
              <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
                {/* Image section */}
                <div className={`w-full md:w-7/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] border border-white/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}></div>
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                      priority={index === 0}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                </div>
                
                {/* Content section */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'} mt-8 md:mt-0`}>
                  <div className="text-left">
                    <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                      <span className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                        Feature {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="flex space-x-4 mt-8">
                      {showcaseItems.map((item, i) => (
                        <button 
                          key={i}
                          onClick={(e) => handleDotClick(i, e)}
                          className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                            i === activeIndex 
                              ? 'bg-blue-500 scale-125 ring-2 ring-blue-400 ring-opacity-50' 
                              : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                          }`}
                          aria-label={`Go to ${item.title}`}
                          aria-current={i === activeIndex ? 'step' : undefined}
                        >
                          <span className="sr-only">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
