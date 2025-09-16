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
      description: "Add Ryzen V1 to your server with just a few commands.",
      color: "primary"
    },
    {
      number: "02", 
      icon: Settings2,
      title: "Configure Settings",
      description: "Customize Ryzen V1 to match your server's needs with our antinuke & Automod",
      color: "secondary"
    },
    {
      number: "03",
      icon: Heart,
      title: "Enjoy the Benefits", 
      description: "Let Ryzen V1 handle moderation, entertainment, and engagement while you focus on growing your community.",
      color: "accent"
    }
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 lg:px-6 bg-muted/10 relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-text-muted max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-inter">
            Getting started with Ryzen V1 is simple and takes less than 2 minutes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 px-2 sm:px-4">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className={`bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass text-center relative group hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer overflow-hidden ${sectionVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Enhanced background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 xl:-right-8 w-6 xl:w-8 h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              <CardHeader className="pb-3 sm:pb-4 relative z-10">
                <div className="relative mb-4 sm:mb-6">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors duration-300 font-space mb-2 sm:mb-4">
                    {step.number}
                  </div>
                  
                  {/* Enhanced icon container */}
                  <div className="w-12 sm:w-16 lg:w-18 xl:w-20 h-12 sm:h-16 lg:h-18 xl:h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
                    <step.icon className="w-6 sm:w-8 lg:w-9 xl:w-10 h-6 sm:h-8 lg:h-9 xl:h-10 text-primary group-hover:text-primary-glow transition-colors duration-300 relative z-10" />
                    
                    {/* Rotating border effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-sm animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-foreground font-space group-hover:text-gradient transition-all duration-300 mb-2 sm:mb-3">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 px-4 sm:px-6">
                <CardDescription className="text-text-muted leading-relaxed text-xs sm:text-sm lg:text-base xl:text-lg font-inter group-hover:text-foreground transition-colors duration-300">
                  {step.description}
                </CardDescription>
              </CardContent>
              
              {/* Enhanced shimmer effect */}
              <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-secondary/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className={`text-center mt-8 sm:mt-12 lg:mt-16 ${sectionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <p className="text-sm sm:text-base lg:text-lg text-text-muted mb-4 sm:mb-6">
            Ready to transform your Discord server?
          </p>
          <a 
            href="https://discord.com/oauth2/authorize?client_id=1187059297570525255&permissions=8&integration_type=0&scope=bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-button-hover text-sm sm:text-base"
          >
            Get Started Now →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;