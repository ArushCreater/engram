import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 text-center text-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://placehold.co/1920x1080.png" // Placeholder for the globe/network graphic
          alt="Abstract network background"
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint="abstract globe network"
        />
      </div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          THE FUTURE OF HOW KNOWLEDGE IS TRANSFERRED
        </h1>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
          Create your own brain
        </Button>
      </div>
    </section>
  );
}
