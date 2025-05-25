
'use client';
import { FileText, Asterisk } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const initialDocumentPositions = Array.from({ length: 15 }).map(() => ({
  top: `${Math.random() * 80 + 10}%`, 
  left: `${Math.random() * 85 + 7.5}%`,
  rotation: Math.random() * 360,
  scale: 0.8 + Math.random() * 0.4,
  opacity: 0.6 + Math.random() * 0.3,
  animationDelay: `${Math.random() * 2}s`,
  animationDuration: `${4 + Math.random() * 2}s`,
  sucked: false, // Initialize with sucked: false
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

    let timerId: NodeJS.Timeout;

    if (!isOn) {
      // When turning OFF
      const wasOn = documentPositions.some(p => p.sucked);
      if (wasOn) { // Only re-randomize if they were previously sucked
        const newInitialPositions = Array.from({ length: 15 }).map(() => ({
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 85 + 7.5}%`,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.6 + Math.random() * 0.3,
          animationDelay: `${Math.random() * 0.5}s`, // Faster delay for reappearance
          animationDuration: `${3 + Math.random() * 1.5}s`, // Faster duration
          sucked: false,
        }));
        setDocumentPositions(newInitialPositions);
      }
    } else {
      // When turning ON
      // Introduce a small delay to ensure the browser registers class changes
      // before applying the 'sucked: true' state for transition.
      timerId = setTimeout(() => {
        setDocumentPositions(prevPositions => 
          prevPositions.map(p => ({...p, sucked: true}))
        );
      }, 20); // Small delay like 20ms or 50ms
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOn, clientRendered]); // documentPositions removed from dependencies to prevent loops


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
              className={cn(
                'absolute text-foreground/80 transition-all',
                pos.sucked ? 'duration-[1200ms] ease-in' : 'animate-subtle-float'
              )}
              size={40 * pos.scale}
              style={
                pos.sucked ? {
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(0.01) rotate(${pos.rotation + 720}deg)`,
                  opacity: 0,
                  transitionDelay: `${index * 30}ms` 
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
            className={cn(
              "flex flex-col items-center space-y-8 transition-transform duration-500 ease-out",
              isOn ? 'scale-110 delay-[900ms]' : 'scale-100'
            )}
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
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input scale-[1.75]"
              />
              <Label htmlFor="time-toggle" className="text-md text-muted-foreground select-none">ON</Label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
