'use client';
import { FileText, ToggleLeft, ToggleRight, Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const documentPositions = [
  { top: '10%', left: '15%' }, { top: '20%', left: '70%' },
  { top: '30%', left: '5%' }, { top: '40%', left: '80%' },
  { top: '50%', left: '25%' }, { top: '60%', left: '65%' },
  { top: '70%', left: '10%' }, { top: '80%', left: '75%' },
  { top: '5%', left: '45%' }, { top: '85%', left: '35%' }, // Added more
  { top: '15%', left: '5%' }, { top: '90%', left: '90%' }, // Added more
];

export default function TimeSection() {
  const [isOn, setIsOn] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);


  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-secondary text-foreground overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          We're running out of Time
        </h2>
        
        {clientRendered && documentPositions.map((pos, index) => (
          <FileText 
            key={index} 
            className="absolute text-muted-foreground/20 animate-subtle-float" 
            size={32 + Math.random() * 24} 
            style={{ 
              top: pos.top, 
              left: pos.left, 
              transform: `rotate(${Math.random() * 360}deg) translate(${Math.random()*20-10}px, ${Math.random()*20-10}px)`,
              opacity: 0.15 + Math.random() * 0.2,
              animationDelay: `${Math.random() * 2.5}s`, 
              animationDuration: `${5 + Math.random() * 3}s`,
            }} 
          />
        ))}

        <div className="relative z-10 flex flex-col items-center space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-3 text-foreground">
            <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s' }} />
            <span className="text-5xl font-semibold">engram</span>
            <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }} />
          </div>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => setIsOn(!isOn)}
            className="p-0 h-auto group"
            aria-label={isOn ? "Switch Off Engram" : "Switch On Engram"}
          >
            {isOn ? 
              <ToggleRight className="h-20 w-20 text-primary transition-all duration-300 ease-in-out group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-secondary rounded-full" /> : 
              <ToggleLeft className="h-20 w-20 text-muted-foreground transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-foreground/70 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-secondary rounded-full" />}
          </Button>
        </div>
      </div>
    </section>
  );
}
