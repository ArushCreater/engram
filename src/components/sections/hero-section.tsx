
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-foreground overflow-hidden bg-gradient-to-b from-[#1e293b] to-background py-20 md:py-0">
      {/* Geodesic dome visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[120vw] max-w-[1200px] aspect-square">
          <Image
            src="/geodesic-dome.png" 
            alt="Geodesic dome network visualization"
            layout="fill"
            objectFit="contain"
            priority
            className="opacity-80"
          />
        </div>
      </div>
      
      {/* Hero content */}
      <div className="relative container mx-auto px-4 z-10 pt-20">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 tracking-tight text-white uppercase" 
        >
          THE FUTURE OF HOW KNOWLEDGE IS TRANSFERRED
        </h1>
        
        <Button 
          variant="glass-primary"
          size="lg" 
          className="px-8 py-4 text-lg font-medium text-white rounded-md"
        >
          Create your own brain
        </Button>
      </div>
    </section>
  );
}
