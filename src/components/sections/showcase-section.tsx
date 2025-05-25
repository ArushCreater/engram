import Image from 'next/image';

export default function ShowcaseSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Showcase</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Experience the power of live extraction and neural creation. Watch as Engram transforms raw information into an interconnected web of knowledge.
        </p>
        <div 
          className="relative max-w-4xl mx-auto aspect-video bg-card border border-border rounded-lg shadow-2xl p-2 opacity-0 animate-fade-in-up transition-all duration-300 hover:shadow-primary/30 hover:ring-2 hover:ring-primary/50"
          style={{ animationDelay: '0.6s' }}
        >
          <Image
            src="https://placehold.co/1200x675.png" // Placeholder for the UI showcase
            alt="Engram UI Showcase"
            layout="fill"
            objectFit="contain"
            className="rounded-md"
            data-ai-hint="software interface dashboard"
          />
        </div>
      </div>
    </section>
  );
}
