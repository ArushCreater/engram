import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-40 text-center text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <Image
          src="https://placehold.co/1920x1080.png" // Placeholder for the globe/network graphic
          alt="Abstract network background"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="abstract globe network"
          className="animate-pulse-slow" // A subtle pulse for the background
        />
      </div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          THE FUTURE OF HOW KNOWLEDGE IS TRANSFERRED
        </h1>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Create your own brain
        </Button>
      </div>
    </section>
  );
}
