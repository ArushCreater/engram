'use client';
import { FileText, ToggleLeft, ToggleRight, Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const documentPositions = [
  { top: '10%', left: '15%' }, { top: '20%', left: '70%' },
  { top: '30%', left: '5%' }, { top: '40%', left: '80%' },
  { top: '50%', left: '25%' }, { top: '60%', left: '65%' },
  { top: '70%', left: '10%' }, { top: '80%', left: '75%' },
];

export default function TimeSection() {
  const [isOn, setIsOn] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);


  return (
    <section className="relative py-16 md:py-24 bg-secondary text-foreground overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          We're running out of Time
        </h2>
        
        {clientRendered && documentPositions.map((pos, index) => (
          <FileText 
            key={index} 
            className="absolute text-muted-foreground/30 animate-subtle-float" 
            size={32 + Math.random() * 20} 
            style={{ 
              top: pos.top, 
              left: pos.left, 
              transform: `rotate(${Math.random() * 360}deg) translate(${Math.random()*15-7.5}px, ${Math.random()*15-7.5}px)`,
              opacity: 0.2 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 2}s`, // Stagger float animation
            }} 
          />
        ))}

        <div className="relative z-10 flex flex-col items-center space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-2 text-foreground">
            <Asterisk className="h-10 w-10 text-primary animate-spin-slow" style={{ animationDuration: '10s' }} />
            <span className="text-4xl font-semibold">engram</span>
          </div>
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => setIsOn(!isOn)}
            className="p-0 h-auto group"
            aria-label={isOn ? "Switch Off" : "Switch On"}
          >
            {isOn ? 
              <ToggleRight className="h-16 w-16 text-primary transition-transform duration-300 ease-in-out group-hover:scale-110" /> : 
              <ToggleLeft className="h-16 w-16 text-muted-foreground transition-transform duration-300 ease-in-out group-hover:scale-110" />}
          </Button>
        </div>
      </div>
    </section>
  );
}
