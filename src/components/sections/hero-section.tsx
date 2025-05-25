
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-foreground overflow-hidden py-20 md:py-0">
      <div className="absolute inset-0 opacity-30 animate-pulse-slow">
        <Image
          src="https://placehold.co/1920x1080.png" 
          alt="Abstract network background"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="abstract globe network"
        />
      </div>
      <div className="relative container mx-auto px-4">
        <h1 
          className="text-5xl md:text-7xl font-bold mb-10 tracking-tight opacity-0 animate-fade-in-up text-foreground/90" 
          style={{ animationDelay: '0.2s' }}
        >
          THE FUTURE OF HOW KNOWLEDGE IS TRANSFERRED
        </h1>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold shadow-xl hover:shadow-primary/60 transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Create your own brain
        </Button>
      </div>
    </section>
  );
}
