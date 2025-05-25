import Image from 'next/image';

export default function ShowcaseSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Showcase</h2>
        <p className="text-xl text-muted-foreground mb-12">
          Live Extraction and Neural Creation
        </p>
        <div className="relative max-w-4xl mx-auto aspect-video bg-card border border-border rounded-lg shadow-2xl p-2">
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
