import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Never wonder what to learn next—your Brain knows.',
    description: 'Personalized learning paths tailored to your knowledge gaps and goals, ensuring you always focus on what matters most for your growth.',
  },
  {
    title: 'See your knowledge grow—no more lost in PDFs or videos.',
    description: 'Track your progress visually with an intuitive knowledge graph. Understand complex topics with ease as concepts connect and build upon each other.',
  },
  {
    title: 'From passive file dumps to active understanding—every concept becomes a Neuron.',
    description: 'Transform static information into dynamic, interconnected knowledge units. Engage with your learning material like never before.',
  },
];

export default function LearnersFeaturesSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card border-border shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-[1.02] opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Image
              src="https://placehold.co/500x500.png" 
              alt="Knowledge Network Graphic"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl"
              data-ai-hint="futuristic data visualization"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
