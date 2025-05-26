
'use client';
import { FileText, Asterisk, Sparkles } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Helper to generate initial positions
// Add more variety to document types
const documentIcons = [
  { icon: FileText, color: 'text-blue-400' },
  { icon: FileText, color: 'text-purple-400' },
  { icon: FileText, color: 'text-pink-400' },
  { icon: FileText, color: 'text-cyan-400' },
  { icon: FileText, color: 'text-green-400' },
];

const generateInitialDocumentStates = (count = 20) => {
  return Array.from({ length: count }).map((_, index) => {
    const iconIndex = Math.floor(Math.random() * documentIcons.length);
    const { icon: Icon, color } = documentIcons[iconIndex];
    const size = 0.7 + Math.random() * 0.6; // More size variation
    
    return {
      id: `doc-${index}`,
      top: `${Math.random() * 85 + 7.5}%`,
      left: `${Math.random() * 85 + 7.5}%`,
      rotation: Math.random() * 360,
      scale: size,
      opacity: 0.7 + Math.random() * 0.3,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${5 + Math.random() * 3}s`,
      sucked: false,
      Icon,
      color,
      zIndex: Math.floor(Math.random() * 10),
      pulse: Math.random() > 0.7, // Some files will have a subtle pulse
    };
  });
};

export default function TimeSection() {
  const [isOn, setIsOn] = useState(false);
  const [clientRendered, setClientRendered] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize with generated states
  const [documentPositions, setDocumentPositions] = useState(() => generateInitialDocumentStates());

  useEffect(() => {
    setClientRendered(true);
    // Ensure initial positions are set on client mount
    // This might be redundant if useState initializer works correctly on SSR->CSR
    // but helps ensure consistency.
    setDocumentPositions(generateInitialDocumentStates());
  }, []);

  // Handle the toggle effect
  useEffect(() => {
    if (!clientRendered) return;

    let timerId: NodeJS.Timeout | undefined;
    let resetTimerId: NodeJS.Timeout | undefined;

    if (isOn) {
      // When turning ON:
      // 1. First, mark all files as being sucked in
      timerId = setTimeout(() => {
        setDocumentPositions(prevPositions =>
          prevPositions.map(p => ({ ...p, sucked: true }))
        );
        
        // 2. After a delay, show the logo
        resetTimerId = setTimeout(() => {
          setShowLogo(true);
        }, 800);
        
      }, 50);
      
    } else {
      // When turning OFF:
      setShowLogo(false);
      
      // Reset files to floating positions with a nice spread out effect
      setDocumentPositions(prevPositions => {
        const wasOn = prevPositions.some(p => p.sucked);
        if (wasOn || prevPositions.length === 0 || prevPositions.every(p => p.sucked)) {
          return generateInitialDocumentStates();
        }
        return prevPositions;
      });
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      if (resetTimerId) clearTimeout(resetTimerId);
    };
  }, [isOn, clientRendered]);


  const handleToggle = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2
          className="text-4xl md:text-6xl font-bold text-center mb-16 opacity-0 animate-fade-in-up text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/60"
          style={{ animationDelay: '0.2s' }}
        >
          We&apos;re running out of Time
        </h2>

        {/* Glow effect behind the logo */}
        <div className={cn(
          'absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transition-opacity duration-1000',
          showLogo ? 'opacity-100' : 'opacity-0'
        )}>
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Documents flying around */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
          {clientRendered && documentPositions.map((pos, index) => {
            const { Icon, color, ...rest } = pos;
            return (
              <div
                key={pos.id}
                className={cn(
                  'absolute transition-all duration-700',
                  pos.pulse && 'animate-pulse-slow',
                  pos.sucked ? 'ease-in-out' : 'ease-in-out'
                )}
                style={{
                  zIndex: pos.zIndex,
                  ...(pos.sucked ? {
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(0.01) rotate(${pos.rotation + 720}deg)`,
                    opacity: 0,
                    transitionDelay: `${index * 20}ms`,
                    transitionDuration: '1000ms',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  } : {
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotation}deg) scale(${pos.scale})`,
                    opacity: pos.opacity,
                    animationDelay: pos.animationDelay,
                    animationDuration: pos.animationDuration,
                  })
                }}
              >
                <Icon 
                  className={cn(
                    'transition-all duration-700',
                    color,
                    pos.sucked ? 'scale-150' : ''
                  )}
                  size={40}
                />
              </div>
            );
          })}
        </div>

        {/* Main content with logo and switch */}
        <div 
          className={cn(
            "relative z-10 flex flex-col items-center justify-center transition-all duration-1000",
            isOn ? 'scale-100' : 'scale-90',
            showLogo ? 'opacity-100' : 'opacity-0 animate-fade-in-up'
          )}
          style={{ 
            minHeight: '50vh',
            animationDelay: '0.4s',
            transform: isOn ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          <div className={cn(
            "flex flex-col items-center space-y-8 transition-all duration-1000",
            isOn ? 'scale-110' : 'scale-100'
          )}>
            {/* Logo container with reveal effect */}
            <div className={cn(
              'relative flex items-center justify-center transition-all duration-1000',
              showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            )}>
              {/* Glowing orb behind logo */}
              <div className={cn(
                'absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20',
                'transition-all duration-1000',
                isOn ? 'opacity-100 scale-100 blur-xl' : 'opacity-0 scale-90'
              )}></div>
              
              {/* Main logo */}
              <div className={cn(
                'relative z-10 w-40 h-40 md:w-60 md:h-60 flex items-center justify-center',
                'transition-all duration-1000',
                isOn ? 'scale-100' : 'scale-90'
              )}>
                <Image
                  src="/image 94.png"
                  alt="engram Logo"
                  width={240}
                  height={240}
                  className={cn(
                    'w-full h-full object-contain transition-all duration-1000',
                    isOn ? 'opacity-100' : 'opacity-0'
                  )}
                />
                
                {/* Sparkle effects */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <div 
                    key={i}
                    className={cn(
                      'absolute w-2 h-2 rounded-full bg-white/80',
                      'transition-all duration-1000',
                      isOn ? 'opacity-100' : 'opacity-0',
                      i === 0 && '-top-2 left-1/2 -translate-x-1/2',
                      i === 1 && 'top-1/2 -right-2 -translate-y-1/2',
                      i === 2 && '-bottom-2 left-1/2 -translate-x-1/2',
                      i === 3 && 'top-1/2 -left-2 -translate-y-1/2'
                    )}
                    style={{
                      animation: isOn ? `pulse 2s ease-in-out ${i * 0.2}s infinite` : 'none',
                      boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Toggle switch with improved styling */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                {/* Animated background ring when active */}
                <div className={cn(
                  'absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full',
                  'transition-all duration-1000',
                  isOn ? 'opacity-100 scale-110' : 'opacity-0 scale-95'
                )}></div>
                
                <div className="relative flex items-center space-x-3 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 shadow-lg">
                  <Label 
                    htmlFor="time-toggle" 
                    className={cn(
                      'text-sm font-medium select-none transition-colors',
                      isOn ? 'text-muted-foreground' : 'text-foreground'
                    )}
                  >
                    OFF
                  </Label>
                  
                  <Switch
                    id="time-toggle"
                    checked={isOn}
                    onCheckedChange={handleToggle}
                    aria-label={isOn ? "Switch Off Engram" : "Switch On Engram"}
                    className={cn(
                      'relative h-8 w-16 scale-110 transition-all duration-300',
                      'data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600',
                      'data-[state=unchecked]:bg-input',
                      'shadow-lg shadow-black/20',
                      isOn ? 'ring-2 ring-offset-2 ring-blue-500/30' : ''
                    )}
                  >
                    <span className={cn(
                      'absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background shadow-md',
                      'flex items-center justify-center transition-transform duration-300',
                      isOn ? 'translate-x-8' : 'translate-x-0',
                      'group-hover:scale-110',
                      'group-data-[state=checked]:bg-white',
                      'group-data-[state=unchecked]:bg-white/90'
                    )}>
                      <Sparkles 
                        className={cn(
                          'h-3 w-3 text-yellow-400 transition-opacity duration-300',
                          isOn ? 'opacity-100' : 'opacity-0'
                        )} 
                      />
                    </span>
                  </Switch>
                  
                  <Label 
                    htmlFor="time-toggle" 
                    className={cn(
                      'text-sm font-medium select-none transition-colors',
                      isOn ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    ON
                  </Label>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2 max-w-xs text-center">
                {isOn ? 'Organizing your knowledge...' : 'Click to organize your knowledge'}
              </p>
            </div>
          </div>
          
          {/* Particles effect when active */}
          {isOn && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: 0,
                    animation: `float-up ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                    transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Global animations */}
      <style jsx global>{`
        @keyframes float-up {
          0% { 
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { 
            transform: translateY(-100px) translateX(${Math.random() * 40 - 20}px);
            opacity: 0;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
