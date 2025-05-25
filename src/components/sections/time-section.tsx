
'use client';
import { FileText, Asterisk } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';

// Increased number of documents for a more dramatic effect
const initialDocumentPositions = Array.from({ length: 15 }).map(() => ({
  top: `${Math.random() * 80 + 10}%`, 
  left: `${Math.random() * 85 + 7.5}%`, // Adjusted to keep them a bit more central
  rotation: Math.random() * 360,
  scale: 0.8 + Math.random() * 0.4,  // Slightly larger base scale
  opacity: 0.6 + Math.random() * 0.3, // Increased base opacity
  animationDelay: `${Math.random() * 2}s`,
  animationDuration: `${4 + Math.random() * 2}s`,
}));

export default function TimeSection() {
  const [isOn, setIsOn] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);
  const [documentPositions, setDocumentPositions] = useState(initialDocumentPositions);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  useEffect(() => {
    if (!clientRendered) return;

    if (!isOn) {
      const wasOn = documentPositions.some(p => (p as any).sucked);
      if (wasOn) {
        const newInitialPositions = Array.from({ length: 15 }).map(() => ({ // Match new length
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 85 + 7.5}%`,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.6 + Math.random() * 0.3, // Match new opacity
          animationDelay: `${Math.random() * 0.5}s`,
          animationDuration: `${3 + Math.random() * 1.5}s`,
          sucked: false,
        }));
        setDocumentPositions(newInitialPositions);
      }
    } else {
      setDocumentPositions(prevPositions => 
        prevPositions.map(p => ({...p, sucked: true}))
      );
    }
  }, [isOn, clientRendered]);


  const handleToggle = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-bold text-center mb-16 opacity-0 animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/60"
          style={{ animationDelay: '0.2s' }}
        >
          We&apos;re running out of Time
        </h2>
        
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {clientRendered && documentPositions.map((pos, index) => (
            <FileText 
              key={index} 
              className={`absolute text-foreground/80 transition-all ${ (pos as any).sucked ? 'duration-[1200ms] ease-in' : 'animate-subtle-float'}`} 
              size={40 * pos.scale} // Increased base size
              style={
                (pos as any).sucked ? {
                  top: '50%',
                  left: '50%',
                  // Target the center of the screen (where "engram" logo is)
                  transform: `translate(-50%, -50%) scale(0.01) rotate(${pos.rotation + 720}deg)`, // Added more rotation for spin
                  opacity: 0,
                  transitionDelay: `${index * 30}ms` // Slightly faster stagger
                } : { 
                  top: pos.top, 
                  left: pos.left, 
                  transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                  opacity: pos.opacity,
                  animationDelay: pos.animationDelay, 
                  animationDuration: pos.animationDuration,
                }
              } 
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
           <div 
            className={`flex flex-col items-center space-y-8 transition-transform duration-500 ease-out ${isOn ? 'scale-110 delay-[900ms]' : 'scale-100'}`}
          >
            <div className="flex items-center space-x-3 text-foreground">
              <Asterisk className="h-10 w-10 md:h-12 md:w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s' }} />
              <span className="text-4xl md:text-5xl font-semibold">engram</span>
              <Asterisk className="h-10 w-10 md:h-12 md:w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
            </div>
            
            <div className="flex items-center space-x-3">
              <Label htmlFor="time-toggle" className="text-md text-muted-foreground select-none">OFF</Label>
              <Switch 
                id="time-toggle" 
                checked={isOn} 
                onCheckedChange={handleToggle}
                aria-label={isOn ? "Switch Off Engram" : "Switch On Engram"}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input scale-[1.75]" // Increased switch size
              />
              <Label htmlFor="time-toggle" className="text-md text-muted-foreground select-none">ON</Label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

