
import Link from 'next/link';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-[hsl(30,15%,10%)] border-t border-border/20"> {/* Dark warm background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 
            className="text-3xl md:text-5xl font-bold text-foreground/90 mb-8"
          >
            Discover more Brains
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-10">
              <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s' }}/>
              <span className="text-5xl font-semibold text-foreground/90">engram</span>
              <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }}/>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 text-xl font-semibold shadow-xl hover:shadow-primary/60 transition-all duration-300 transform hover:scale-105"
          >
            Join the Waitlist
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          &copy; {new Date().getFullYear()} Engram Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
