
'use client';
import { FileText, ToggleLeft, ToggleRight, Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const initialDocumentPositions = Array.from({ length: 12 }).map(() => ({
  top: `${Math.random() * 80 + 10}%`, // Avoid edges for better sucking effect
  left: `${Math.random() * 80 + 10}%`,
  rotation: Math.random() * 360,
  scale: 0.8 + Math.random() * 0.4, // Slight size variation
  opacity: 0.3 + Math.random() * 0.3,
  animationDelay: `${Math.random() * 2.5}s`,
  animationDuration: `${5 + Math.random() * 3}s`,
}));

export default function TimeSection() {
  const [isOn, setIsOn] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);
  const [documentPositions, setDocumentPositions] = useState(initialDocumentPositions);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  // Reset positions if toggle is switched off after being on
  useEffect(() => {
    if (!isOn && clientRendered) {
      // Check if it was previously on to avoid resetting on initial load if isOn starts false
      const wasOn = documentPositions.some(p => (p as any).sucked);
      if (wasOn) {
        setDocumentPositions(initialDocumentPositions.map(p => ({...p, sucked: false})));
      }
    }
  }, [isOn, clientRendered]);


  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (newState) {
      setDocumentPositions(prevPositions => 
        prevPositions.map(p => ({...p, sucked: true}))
      );
    }
    // If turning off, the useEffect above will handle resetting
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-secondary text-foreground overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-bold mb-16 opacity-0 animate-fade-in-up bg-gradient-to-r from-primary via-primary to-foreground/60 bg-clip-text text-transparent" 
          style={{ animationDelay: '0.2s' }}
        >
          We&apos;re running out of Time
        </h2>
        
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          {clientRendered && documentPositions.map((pos, index) => (
            <FileText 
              key={index} 
              className={`absolute text-muted-foreground/30 transition-all ${ (pos as any).sucked ? 'duration-[1000ms] ease-in-out' : 'animate-subtle-float'}`} 
              size={32 * pos.scale} 
              style={
                (pos as any).sucked ? {
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -100%) scale(0.05) rotate(${pos.rotation}deg)`, // Target near logo
                  opacity: 0,
                  transitionDelay: `${index * 40}ms` // Stagger the animation
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

        <div className="relative z-10 flex flex-col items-center space-y-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-4 text-foreground">
            <Asterisk className="h-16 w-16 text-primary animate-spin-slow" style={{ animationDuration: '10s' }} />
            <span className="text-6xl font-semibold">engram</span>
            <Asterisk className="h-16 w-16 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          </div>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={handleToggle}
            className="p-0 h-auto group"
            aria-label={isOn ? "Switch Off Engram" : "Switch On Engram"}
          >
            {isOn ? 
              <ToggleRight className="h-32 w-32 md:h-36 md:w-36 text-primary transition-all duration-300 ease-in-out group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-secondary rounded-full" /> : 
              <ToggleLeft className="h-32 w-32 md:h-36 md:w-36 text-muted-foreground transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-foreground/70 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-secondary rounded-full" />}
          </Button>
        </div>
      </div>
    </section>
  );
}

