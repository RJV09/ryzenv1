import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings2, Heart } from "lucide-react";

const HowItWorks = () => {
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
    <section id="how-it-works" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It Works
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Getting started with Ryzen V1 is simple and takes less than 2 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-feature-card border-border text-center relative group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">
                  {step.number}
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-text-muted leading-relaxed">
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