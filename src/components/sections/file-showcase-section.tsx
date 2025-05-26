"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatedSwitch } from '@/components/ui/animated-switch';
import { Card } from '@/components/ui/card';

// File examples to showcase
const files = [
  { 
    name: 'Neural Networks.pdf',
    icon: '📄',
    size: '2.4 MB',
    date: 'May 24, 2025',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'Research Data.xlsx',
    icon: '📊',
    size: '1.8 MB',
    date: 'May 22, 2025',
    color: 'from-green-500 to-teal-600'
  },
  { 
    name: 'Meeting Notes.docx',
    icon: '📝',
    size: '0.9 MB',
    date: 'May 20, 2025',
    color: 'from-purple-500 to-blue-600'
  },
  { 
    name: 'Presentation.pptx',
    icon: '🖼️',
    size: '3.7 MB',
    date: 'May 18, 2025',
    color: 'from-orange-500 to-red-600'
  },
  { 
    name: 'Code Samples.zip',
    icon: '📦',
    size: '7.2 MB',
    date: 'May 15, 2025',
    color: 'from-indigo-500 to-blue-600'
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
      className="relative bg-gradient-to-b from-[#080c14] to-[#050810] py-24 min-h-screen flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-full h-full bg-[url('/network-bg.svg')] opacity-10 bg-repeat"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-16 opacity-0 animate-fade-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
              Instant knowledge transfer
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Experience seamless file transfer with our neural network technology.
              Enable the transfer and watch how your knowledge flows instantly.
            </p>
          </div>
          
          {/* Transfer toggle control */}
          <div className="flex justify-center mb-16 opacity-0 animate-fade-slide-up delay-200">
            <Card className="bg-[#0c1018]/70 border-[#2A2A2A] shadow-xl p-6 w-72">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-white font-semibold">Neural Transfer</h3>
                <AnimatedSwitch 
                  label="Enable transfer" 
                  initialState={transferEnabled}
                  onChange={handleTransferToggle}
                />
              </div>
            </Card>
          </div>
          
          {/* File showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 opacity-0 animate-fade-slide-up delay-300">
            {files.map((file, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ease-out transform ${
                  activeFiles.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                } ${transferEnabled ? 'scale-[1.03] z-10' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card 
                  className={`p-6 bg-[#0c1018]/80 border-[#2A2A2A] hover:border-blue-500/50 transition-all duration-500 overflow-hidden group relative ${
                    transferEnabled ? 'shadow-xl shadow-blue-500/20 border-blue-500/30' : ''
                  }`}
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-purple-600/0 rounded-lg blur-lg group-hover:from-blue-600/10 group-hover:via-blue-600/10 group-hover:to-purple-600/10 transition-all duration-1000 opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Transfer effect overlay */}
                  {transferEnabled && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70"></div>
                      <div 
                        className="absolute top-0 left-0 w-1/2 h-1 bg-white opacity-80"
                        style={{
                          animation: 'progressAnimation 2s infinite cubic-bezier(0.4, 0, 0.2, 1)',
                          animationDelay: `${index * 0.3}s`
                        }}
                      ></div>
                      
                      {/* Pulse rings */}
                      <div className="absolute top-4 right-4 flex items-center justify-center">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-5 relative z-10">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-br ${file.color} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                      <span className="text-3xl">{file.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors duration-300">{file.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-white/60">{file.date}</p>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/40 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                          <p className="text-sm text-white/60">{file.size}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Transfer indicator */}
                    {transferEnabled && (
                      <div className="relative">
                        {/* Data flowing effect */}
                        <div className="absolute -inset-2 overflow-hidden">
                          {[...Array(3)].map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute h-0.5 bg-blue-500/80"
                              style={{
                                left: `${i * 30}%`,
                                top: '50%',
                                width: '30%',
                                transform: 'translateY(-50%)',
                                animation: `flowAnimation 1.5s infinite ${i * 0.2}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        <div className="h-8 w-8 relative z-10">
                          <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping"></div>
                          <div className="absolute inset-1 rounded-full bg-blue-500 animate-pulse"></div>
                          <div className="absolute inset-2 rounded-full bg-blue-400"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress bar for transfer */}
                  {transferEnabled && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="relative h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{
                            width: `${30 + index * 15}%`,
                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1.5 text-xs text-white/50">
                        <span>{transferEnabled ? `${30 + index * 15}%` : '0%'}</span>
                        <span>Neural Transfer</span>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
          
          {/* Logo at bottom */}
          <div className="mt-24 flex justify-center opacity-0 animate-fade-slide-up delay-500">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/image 94.png" 
                alt="Logo"
                width={100}
                height={100}
                className="opacity-70"
                priority
              />
            </div>
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
