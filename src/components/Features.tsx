import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Music, Users, Ticket, Zap, Settings } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Features = () => {
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>();
  
  const features = [
    {
      icon: Shield,
      title: "Auto Moderation",
      description: "A powerful automoderation which protects your server from raid and spam links!",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Settings,
      title: "Advanced Moderation", 
      description: "Auto-moderate content, filter spam, and keep your server safe with customizable rules.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Music,
      title: "High Quality Music",
      description: "Stream high-quality music from YouTube, Spotify, and other platforms with no interruptions.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Welcome System",
      description: "Create custom welcome messages, roles, and onboarding experiences for new members.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Ticket,
      title: "Ticket Panel",
      description: "Create your own Ticket panel with easy setup and very useful system for your server support.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Zap,
      title: "Smart Utilities", 
      description: "Schedule events, create polls, manage roles, and more with easy-to-use commands.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 lg:px-6 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute top-1/4 left-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-1/4 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-l from-secondary/20 to-transparent rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4 ${featuresVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={featuresRef}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 text-gradient">
            Powerful Features
          </h2>
          <p className="text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-text-muted max-w-3xl xl:max-w-4xl mx-auto leading-relaxed font-inter">
            Everything you need to create an engaging, well-moderated, and fun Discord community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-2 sm:hover:-translate-y-3 cursor-pointer overflow-hidden ${featuresVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Enhanced animated border */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 rounded-lg blur-sm animate-pulse"></div>
              </div>
              
              <CardHeader className="pb-3 sm:pb-4 relative z-10">
                <div className="relative w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-125 transition-all duration-500 animate-breathe" style={{ animationDelay: `${index * 0.5}s` }}>
                  <feature.icon className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                  <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                </div>
                <CardTitle className="text-base sm:text-lg lg:text-xl xl:text-2xl text-foreground font-space group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 pt-0 sm:pt-1">
                <CardDescription className="text-text-muted leading-relaxed text-xs sm:text-sm lg:text-base font-inter group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
              
              {/* Enhanced shimmer effect */}
              <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute bottom-6 left-6 w-0.5 h-0.5 bg-secondary/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-6 w-0.5 h-0.5 bg-accent/60 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;