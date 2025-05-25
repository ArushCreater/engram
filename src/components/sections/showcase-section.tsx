
import Image from 'next/image';

export default function ShowcaseSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in-up bg-gradient-to-r from-primary via-primary to-foreground/60 bg-clip-text text-transparent" 
          style={{ animationDelay: '0.2s' }}
        >
          See Engram in Action
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Experience the power of live extraction and neural creation. Watch as Engram transforms raw information into an interconnected web of knowledge, personalized for you.
        </p>
        <div 
          className="relative max-w-5xl mx-auto aspect-video bg-card border border-border rounded-xl shadow-2xl p-2 opacity-0 animate-fade-in-up transition-all duration-300 hover:shadow-primary/40 hover:ring-2 hover:ring-primary/60"
          style={{ animationDelay: '0.6s' }}
        >
          <Image
            src="https://placehold.co/1280x720.png" 
            alt="Engram UI Showcase video placeholder"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            data-ai-hint="software interface dashboard video"
          />
          <div className="absolute inset-0 flex justify-center items-center group">
            <div className="bg-black/50 p-4 md:p-6 rounded-full transition-all duration-300 group-hover:bg-primary/80 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-white md:w-16 md:h-16 w-10 h-10">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
