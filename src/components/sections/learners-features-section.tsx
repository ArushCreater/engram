
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Neural networks check to learn more—your Brain knows.',
    description: 'Personalized learning paths tailored to your knowledge gaps and goals, ensuring you always focus on what matters most for your growth.',
    image: '/network-1.svg'
  },
  {
    title: 'See your knowledge graph grow—no more getting lost.',
    description: 'Track your progress visually with an intuitive knowledge graph. Understand complex topics with ease as concepts connect and build upon each other.',
    image: '/network-2.svg'
  },
  {
    title: 'From passive to active learning—become more effective by doing more.',
    description: 'Transform static information into dynamic, interconnected knowledge units. Engage with your learning material like never before.',
    image: '/network-3.svg'
  },
];

export default function LearnersFeaturesSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-[#121212] border-[#2A2A2A] rounded-lg overflow-hidden shadow-xl hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="h-32 flex items-center justify-center p-4 border-b border-[#2A2A2A]">
                <div className="w-24 h-24 relative">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} visualization`}
                    width={96}
                    height={96}
                    className="opacity-80"
                  />
                </div>
              </div>
              
              <CardContent className="p-6">
                <CardTitle className="text-sm font-semibold text-white mb-3">{feature.title}</CardTitle>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="relative w-[350px] h-[350px]">
            <Image
              src="/network-2.svg" 
              alt="Knowledge Network Graphic"
              width={350}
              height={350}
              className="opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
