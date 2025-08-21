import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings2, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HowItWorks = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  
  const steps = [
    {
      number: "01",
      icon: Plus,
      title: "Invite Ryzen V1",
      description: "Add Ryzen V1 to your server with just a few commands."
    },
    {
      number: "02", 
      icon: Settings2,
      title: "Configure Settings",
      description: "Customize Ryzen V1 to match your server's needs with our antinuke & Automod"
    },
    {
      number: "03",
      icon: Heart,
      title: "Enjoy the Benefits", 
      description: "Let Ryzen V1 handle moderation, entertainment, and engagement while you focus on growing your community."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-muted/20" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center mb-12 sm:mb-16 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-inter">
            Getting started with Ryzen V1 is simple and takes less than 2 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className={`bg-card-gradient border-glass-border glass text-center relative group hover:shadow-feature transition-all duration-500 hover:-translate-y-2 cursor-pointer ${sectionVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="pb-4 relative">
                <div className="text-7xl sm:text-8xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors duration-300 font-space">
                  {step.number}
                </div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-foreground font-space group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-text-muted leading-relaxed text-sm sm:text-base lg:text-lg font-inter group-hover:text-foreground transition-colors duration-300">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;