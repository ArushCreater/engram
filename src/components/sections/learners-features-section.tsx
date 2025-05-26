"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Feature items
const features = [
  {
    title: "Accelerate learning",
    description: "Our neural technology enhances memory consolidation, allowing you to learn up to 5x faster than traditional methods.",
    svg: "/network-1.svg",
    delay: 0,
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Connect knowledge networks",
    description: "Visualize connections between concepts to build a comprehensive knowledge graph that evolves as you learn.",
    svg: "/network-2.svg",
    delay: 200,
    color: "from-purple-500 to-blue-500"
  },
  {
    title: "Transfer understanding",
    description: "Directly share neural patterns of knowledge, making complex topics instantly accessible across learning networks.",
    svg: "/network-3.svg",
    delay: 400,
    color: "from-indigo-500 to-purple-500"
  }
];

export default function LearnersFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize intersection observer for the section visibility
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip on server-side rendering
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when section comes into view
            const section = entry.target as HTMLElement;
            section.classList.add('section-visible');
            
            // Manually add animation classes to feature cards with delay
            const featureCards = section.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 150); // Stagger the animations
            });
            
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Function to handle dot click and switch feature with animation
  const scrollToFeature = (index: number) => {
    if (index < 0 || index >= features.length || index === activeIndex) return;
    
    // Start fade out
    const currentCard = document.querySelector(`.feature-card[data-active="true"]`);
    if (currentCard) {
      currentCard.setAttribute('data-active', 'false');
    }
    
    // After fade out, update state and fade in new card
    setTimeout(() => {
      setActiveIndex(index);
      
      // Force reflow
      requestAnimationFrame(() => {
        const newCard = document.querySelector(`.feature-card[data-index="${index}"]`);
        if (newCard) {
          newCard.setAttribute('data-active', 'true');
        }
      });
    }, 300); // Match this with CSS transition duration
  };
  
  // Set initial active card
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const firstCard = document.querySelector('.feature-card');
      if (firstCard) {
        firstCard.setAttribute('data-active', 'true');
      }
    }
  }, []);

  // Set up section visibility
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRef.current?.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#0a0f19] to-[#070a12] py-24 text-foreground opacity-0 transition-opacity duration-1000 ease-in-out"
      style={{ minHeight: '100vh' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/network-bg.svg')] opacity-5 bg-repeat"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
            Knowledge transfer, supercharged
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Our network technology revolutionizes the way information moves between brains, 
            creating a new dimension of connected learning.
          </p>
        </div>
        
        {/* Interactive dots navigation */}
        <div className="flex justify-center mb-10 space-x-6">
          {features.map((_, index) => (
            <button 
              key={index} 
              onClick={() => scrollToFeature(index)}
              className={`dot w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'active bg-blue-500 scale-125' : 'bg-white/30 hover:bg-blue-400/50'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0f19]`}
              aria-label={`View feature ${index + 1}`}
              aria-current={activeIndex === index ? 'step' : undefined}
              tabIndex={0}
            />
          ))}
        </div>
        
        {/* Feature cards with fade animation */}
        <div className="relative min-h-[400px] md:min-h-[500px] py-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              data-active={activeIndex === index ? 'true' : 'false'}
              className="feature-card absolute inset-0 transition-opacity duration-300 ease-out opacity-0"
              style={{
                visibility: activeIndex === index ? 'visible' : 'hidden',
                opacity: activeIndex === index ? 1 : 0,
                transition: 'opacity 300ms ease-out, transform 300ms ease-out',
                transform: activeIndex === index ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  {/* Feature image */}
                  <div className="w-full md:w-1/2">
                    <div className="bg-[#0c0e14] p-8 rounded-2xl overflow-hidden relative group border border-white/10 hover:border-white/20 transition-colors duration-300">
                      {/* Subtle highlight on hover */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                           style={{
                             background: `radial-gradient(ellipse at center, ${feature.color.replace('from-', '').replace('to-', '')} 0%, transparent 70%)`,
                             filter: 'blur(20px)'
                           }} />
                      <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                      <div className="relative z-10">
                        <img 
                          src={feature.svg} 
                          alt={feature.title} 
                          className="w-full h-64 object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature content */}
                  <div className="w-full md:w-1/2">
                    <Card className="bg-[#0c1018]/70 border-[#2A2A2A] rounded-lg overflow-hidden shadow-2xl hover:border-blue-500/30 hover:shadow-blue-500/5 transition-all duration-500">
                      <CardHeader className="pb-2">
                        <CardTitle className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-white/80 text-lg leading-relaxed">
                          {feature.description}
                        </CardDescription>
                        
                        {/* Additional feature details */}
                        <div className="mt-6 space-y-4">
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                            <p className="text-white/70">
                              {index === 0 ? 'Memory consolidation through neural feedback loops' : 
                               index === 1 ? 'Visual mapping of complex knowledge structures' : 
                               'Direct knowledge exchange between networked users'}
                            </p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                            <p className="text-white/70">
                              {index === 0 ? 'Adaptive learning paths based on your cognitive patterns' : 
                               index === 1 ? 'Real-time visualization of knowledge acquisition' : 
                               'Breakthrough transfer protocol for learning enhancement'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Knowledge network visualization */}
        <div className="mt-24 flex justify-center">
          <div className="relative w-[350px] h-[350px] transform hover:scale-105 transition-transform duration-1000">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src="/image 94.png" 
                alt="Knowledge Network"
                width={200}
                height={200}
                className="opacity-100"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
