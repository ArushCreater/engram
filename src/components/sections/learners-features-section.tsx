import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: 'Never wonder what to learn next—your Brain knows.',
    description: 'Personalized learning paths tailored to your knowledge gaps and goals.',
  },
  {
    title: 'See your knowledge grow—no more lost in PDFs or videos.',
    description: 'Track your progress visually and understand complex topics with ease.',
  },
  {
    title: 'From passive file dumps to active understanding—every concept becomes a Neuron.',
    description: 'Transform static information into dynamic, interconnected knowledge units.',
  },
];

export default function LearnersFeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                  {/* <p className="text-muted-foreground">{feature.description}</p> */}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Image
              src="https://placehold.co/500x500.png" // Placeholder for the circular network graphic
              alt="Knowledge Network Graphic"
              width={500}
              height={500}
              className="rounded-lg"
              data-ai-hint="circular data network"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
