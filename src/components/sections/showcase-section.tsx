
import Image from 'next/image';

export default function ShowcaseSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-secondary text-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center space-y-3 mr-8 md:mr-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-2.5 h-2.5 bg-muted-foreground/50 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-muted-foreground/50 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-muted-foreground/50 rounded-full"></div>
          </div>

          <div className="flex-grow">
            <h2 
              className="text-4xl md:text-6xl font-bold mb-4 opacity-0 animate-fade-in-up text-foreground/90" 
              style={{ animationDelay: '0.2s' }}
            >
              Showcase
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Live Extraction and Neural Creation
            </p>
            <div 
              className="relative max-w-4xl mx-auto aspect-[16/10] bg-card border border-border/50 rounded-xl shadow-2xl p-1.5 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <Image
                src="https://placehold.co/1280x800.png" 
                alt="Engram UI Showcase video placeholder"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                data-ai-hint="software interface video dark"
              />
              <div className="absolute inset-0 flex justify-center items-center group">
                <div className="bg-black/40 p-3 md:p-4 rounded-full transition-all duration-300 group-hover:bg-primary/70 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-white md:w-12 md:h-12 w-8 h-8">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
