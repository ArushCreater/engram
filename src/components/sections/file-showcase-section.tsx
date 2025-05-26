"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatedSwitch } from '@/components/ui/animated-switch';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// File examples to showcase with Notion-like document types
const files = [
  { 
    name: 'Neural Networks.pdf',
    icon: '📄',
    size: '2.4 MB',
    date: 'May 24, 2025',
    type: 'PDF',
    color: 'bg-[#ff7066]'
  },
  { 
    name: 'Research Data.xlsx',
    icon: '📊',
    size: '1.8 MB',
    date: 'May 22, 2025',
    type: 'Spreadsheet',
    color: 'bg-[#4fcc6f]'
  },
  { 
    name: 'Meeting Notes.docx',
    icon: '📝',
    size: '0.9 MB',
    date: 'May 20, 2025',
    type: 'Document',
    color: 'bg-[#0088ff]'
  },
  { 
    name: 'Presentation.pptx',
    icon: '🖼️',
    size: '3.7 MB',
    date: 'May 18, 2025',
    type: 'Presentation',
    color: 'bg-[#ffb942]'
  },
  { 
    name: 'Code Samples.zip',
    icon: '📦',
    size: '7.2 MB',
    date: 'May 15, 2025',
    type: 'Archive',
    color: 'bg-[#9e8cfc]'
  }
];

export default function FileShowcaseSection() {
  const [transferEnabled, setTransferEnabled] = useState(false);
  const [activeFiles, setActiveFiles] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isAnimating = useRef(false);

  // Initialize animation sequence when section becomes visible
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating.current) {
            isAnimating.current = true;
            
            // Add animation class to the section
            sectionRef.current?.classList.add('section-visible');
            
            // Stagger file appearances
            setTimeout(() => {
              // Start with empty array
              setActiveFiles([]);
              
              // Add files one by one with delays
              files.forEach((_, index) => {
                setTimeout(() => {
                  setActiveFiles(prev => [...prev, index]);
                }, index * 600);
              });
            }, 300);
            
            observer.unobserve(entry.target);
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

  // Handle the transfer toggle change
  const handleTransferToggle = (isOn: boolean) => {
    setTransferEnabled(isOn);
    
    // Reset files when turning off
    if (!isOn) {
      // Stagger file appearances again
      setActiveFiles([]);
      
      setTimeout(() => {
        files.forEach((_, index) => {
          setTimeout(() => {
            setActiveFiles(prev => [...prev, index]);
          }, index * 400);
        });
      }, 300);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-24 min-h-screen flex items-center border-t border-border"
    >
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-full h-full bg-[url('/network-bg.svg')] bg-repeat"></div>
      </div>
      
      <div className="notion-container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-20 opacity-0 animate-fade-slide-up">
            <h2 className="notion-heading text-3xl md:text-4xl font-semibold mb-6 text-foreground tracking-tight">
              Organize and share knowledge effortlessly
            </h2>
            <p className="notion-paragraph max-w-2xl mx-auto">
              engram makes knowledge transfer intuitive and seamless. Organize all your files in one place, 
              and share them securely with your team or personal networks.
            </p>
          </div>
          
          {/* Transfer toggle control */}
          <div className="flex justify-center mb-16 opacity-0 animate-fade-slide-up delay-200">
            <div className="flex flex-col items-center">
              <span className="text-sm text-foreground/70 mb-2">Enable smart file sync</span>
              <AnimatedSwitch
                initialState={transferEnabled}
                onChange={handleTransferToggle}
                label=""
              />
            </div>
          </div>
          
          {/* Files showcase - Notion-inspired card layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {files.map((file, index) => (
              <div 
                key={file.name}
                className={`opacity-0 transition-all duration-500 ${activeFiles.includes(index) ? 'opacity-100 translate-y-0' : 'translate-y-8'}`}
              >
                <Card className="notion-shadow-sm hover:notion-shadow-md overflow-hidden bg-background border border-border transition-all duration-200 hover:translate-y-[-2px]">
                  <div className="p-6">
                    {/* File header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-md ${file.color} text-white mr-3`}>
                          <span className="text-xl">{file.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-foreground font-medium">{file.name}</h3>
                          <p className="text-sm text-foreground/60">{file.type}</p>
                        </div>
                      </div>
                      
                      {/* Transfer indicator - more subtle and elegant */}
                      {transferEnabled && (
                        <div className="relative">
                          <div className="h-8 w-8 relative z-10 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-secondary animate-pulse opacity-40"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* File metadata */}
                    <div className="flex items-center justify-between text-sm text-foreground/60 border-t border-border pt-4 mt-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-foreground/40" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {file.date}
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-foreground/40" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {file.size}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar for transfer - more elegant */}
                  {transferEnabled && (
                    <div className="px-6 pb-6">
                      <div className="relative h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-foreground rounded-full"
                          style={{
                            width: `${30 + index * 15}%`,
                            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-foreground/60">
                        <span>{transferEnabled ? `${30 + index * 15}%` : '0%'}</span>
                        <span>Syncing</span>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
          
          {/* Call to action - Notion-style */}
          <div className="mt-24 flex flex-col items-center opacity-0 animate-fade-slide-up delay-500">
            <div className="mb-6">
              <Button 
                size="lg"
                className="px-8 py-6 text-base font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              >
                Get started with engram
              </Button>
            </div>
            <p className="text-sm text-foreground/60 max-w-md text-center">
              Free to try, no credit card required. Start organizing your knowledge today.  
            </p>
          </div>
        </div>
      </div>
      
      {/* Add progress animation */}
      <style jsx>{`
        @keyframes progressAnimation {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
