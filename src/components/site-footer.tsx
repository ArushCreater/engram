import Link from 'next/link';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Ready to Revolutionize Your Learning?
          </h2>
          <div className="flex justify-center items-center space-x-3 mb-10">
              <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s' }}/>
              <span className="text-5xl font-semibold text-foreground">engram</span>
              <Asterisk className="h-12 w-12 text-primary animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse' }}/>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 text-xl font-semibold shadow-xl hover:shadow-primary/60 transition-all duration-300 transform hover:scale-105"
          >
            Join the Waitlist
          </Button>
        </div>
        <p className="text-base text-muted-foreground mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          &copy; {new Date().getFullYear()} Engram Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
