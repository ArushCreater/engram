import Link from 'next/link';
import { Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Discover more Brains</h2>
          <div className="flex justify-center items-center space-x-2 mb-8">
              <Asterisk className="h-10 w-10 text-primary animate-spin-slow" style={{ animationDuration: '10s' }}/>
              <span className="text-4xl font-semibold text-foreground">engram</span>
          </div>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
          >
            Join the waitlist
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          &copy; {new Date().getFullYear()} Engram. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
