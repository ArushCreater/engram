"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Showcase items with images
const showcaseItems = [
  {
    id: 1,
    title: "Neural Knowledge Mapping",
    description: "Visualize your learning pathways and neural connections",
    imageSrc: "https://placehold.co/800x500/1a365d/ffffff.png?text=Neural+Knowledge+Mapping",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Real-time Collaboration",
    description: "Connect with peers and share insights instantly",
    imageSrc: "https://placehold.co/800x500/3f4264/ffffff.png?text=Real-time+Collaboration",
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: 3,
    title: "Advanced Knowledge Transfer",
    description: "Experience accelerated learning through neural interfaces",
    imageSrc: "https://placehold.co/800x500/4a235a/ffffff.png?text=Knowledge+Transfer",
    color: "from-purple-500 to-pink-600"
  }
];

export default function ShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set up scroll-based navigation for the showcase section
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to handle scroll and update active showcase
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollY = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // If we're inside the showcase section
      if (scrollY >= sectionTop - windowHeight/2 && scrollY <= sectionTop + sectionHeight - windowHeight/2) {
        // Calculate which showcase item should be active based on scroll position
        const sectionProgress = (scrollY - (sectionTop - windowHeight/2)) / (sectionHeight - windowHeight/1.5);
        const itemIndex = Math.min(
          Math.floor(sectionProgress * showcaseItems.length),
          showcaseItems.length - 1
        );
        
        if (itemIndex >= 0 && itemIndex < showcaseItems.length && itemIndex !== activeIndex) {
          setActiveIndex(itemIndex);
        }
      }
    };

    // Set up intersection observer for animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check
            
            // Add animation class to the section
            sectionRef.current?.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [activeIndex]);

  // Manually change active showcase
  const goToShowcase = (index: number) => {
    if (index >= 0 && index < showcaseItems.length) {
      setActiveIndex(index);
      
      // Scroll to the item's position
      const itemElement = itemRefs.current[index];
      if (itemElement) {
        const yOffset = -100; // Offset to account for header
        const y = itemElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-[#0c1018] to-[#060a12] min-h-screen"
    >
      {/* Fixed dots navigation */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-6">
        {showcaseItems.map((_, index) => (
          <button 
            key={index} 
            onClick={() => goToShowcase(index)}
            aria-label={`View showcase item ${index + 1}`}
            className={`w-4 h-4 rounded-full transition-all duration-500 ${activeIndex === index ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' : 'bg-white/30 hover:bg-blue-400/50'}`}
          />
        ))}
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
            {showcaseItems.map((_, index) => (
              <button 
                key={index} 
                onClick={() => goToShowcase(index)}
                aria-label={`View showcase item ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === index ? 'bg-blue-500' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Showcase items */}
        <div className="space-y-48 md:space-y-64 pb-24">
          {showcaseItems.map((item, index) => (
            <div 
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`showcase-item relative transform transition-all duration-1000 ${index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-40 blur-sm'}`}
              id={`showcase-${item.id}`}
            >
              <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
                {/* Image section */}
                <div className={`w-full md:w-7/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] border border-white/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}></div>
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                </div>
                
                {/* Content section */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'} mt-8 md:mt-0`}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
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
                    <div className="flex space-x-2">
                      {Array.from({ length: 3 }).map((_, dotIndex) => (
                        <div 
                          key={dotIndex} 
                          className={`w-2 h-2 rounded-full ${dotIndex === 0 ? 'bg-blue-500' : 'bg-white/30'}`}
                        />
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
