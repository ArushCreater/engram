
'use client';
import { FileText, Asterisk } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from 'react';

const initialDocumentPositions = Array.from({ length: 10 }).map(() => ({
  top: `${Math.random() * 70 + 15}%`, 
  left: `${Math.random() * 80 + 10}%`,
  rotation: Math.random() * 360,
  scale: 0.7 + Math.random() * 0.3, 
  opacity: 0.4 + Math.random() * 0.2,
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
      // Reset positions when toggled off, ensuring they are ready to float again
      const wasOn = documentPositions.some(p => (p as any).sucked);
      if (wasOn) {
        // Create new random positions to ensure they spread out again
        const newInitialPositions = Array.from({ length: 10 }).map(() => ({
          top: `${Math.random() * 70 + 15}%`,
          left: `${Math.random() * 80 + 10}%`,
          rotation: Math.random() * 360,
          scale: 0.7 + Math.random() * 0.3,
          opacity: 0.4 + Math.random() * 0.2,
          animationDelay: `${Math.random() * 0.5}s`, // Faster reset animation
          animationDuration: `${3 + Math.random() * 1.5}s`,
          sucked: false,
        }));
        setDocumentPositions(newInitialPositions);
      }
    } else {
      // When toggled on, mark documents as sucked
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
          className="text-4xl md:text-6xl font-bold text-center mb-16 opacity-0 animate-fade-in-up text-foreground/90"
          style={{ animationDelay: '0.2s' }}
        >
          We&apos;re running out of Time
        </h2>
        
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {clientRendered && documentPositions.map((pos, index) => (
            <FileText 
              key={index} 
              className={`absolute text-muted-foreground/40 transition-all ${ (pos as any).sucked ? 'duration-[1000ms] ease-in-out' : 'animate-subtle-float'}`} 
              size={28 * pos.scale} 
              style={
                (pos as any).sucked ? {
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -150%) scale(0.05) rotate(${pos.rotation}deg)`, 
                  opacity: 0,
                  transitionDelay: `${index * 40}ms` 
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

        <div className="relative z-10 flex flex-col items-center space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-3 text-foreground">
            <Asterisk className="h-10 w-10 md:h-12 md:w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s' }} />
            <span className="text-4xl md:text-5xl font-semibold">engram</span>
            <Asterisk className="h-10 w-10 md:h-12 md:w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="time-toggle" className="text-sm text-muted-foreground select-none">OFF</Label>
            <Switch 
              id="time-toggle" 
              checked={isOn} 
              onCheckedChange={handleToggle}
              aria-label={isOn ? "Switch Off Engram" : "Switch On Engram"}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input scale-125"
            />
            <Label htmlFor="time-toggle" className="text-sm text-muted-foreground select-none">ON</Label>
          </div>
        </div>
      </div>
    </section>
  );
}
