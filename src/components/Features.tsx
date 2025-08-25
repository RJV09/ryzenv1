import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Music, Users, Ticket, Zap, Settings } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Features = () => {
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation<HTMLDivElement>();
  
  const features = [
    {
      icon: Shield,
      title: "Auto Moderation",
      description: "A powerful automoderation which protects your server from raid and spam links!"
    },
    {
      icon: Settings,
      title: "Advanced Moderation", 
      description: "Auto-moderate content, filter spam, and keep your server safe with customizable rules."
    },
    {
      icon: Music,
      title: "High Quality Music",
      description: "Stream high-quality music from YouTube, Spotify, and other platforms with no interruptions."
    },
    {
      icon: Users,
      title: "Welcome System",
      description: "Create custom welcome messages, roles, and onboarding experiences for new members."
    },
    {
      icon: Ticket,
      title: "Ticket Panel",
      description: "Create your own Ticket panel with easy setup and very useful system for your server support."
    },
    {
      icon: Zap,
      title: "Smart Utilities", 
      description: "Schedule events, create polls, manage roles, and more with easy-to-use commands."
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-4 ${featuresVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={featuresRef}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 text-gradient">
            Powerful Features
          </h2>
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-inter">
            Everything you need to create an engaging, well-moderated, and fun Discord community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-3 cursor-pointer overflow-hidden ${featuresVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="pb-4 relative z-10">
                <div className="relative w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-125 transition-all duration-500 animate-[breathe_3s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.5}s` }}>
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                </div>
                <CardTitle className="text-lg xs:text-xl sm:text-2xl text-foreground font-space group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-text-muted leading-relaxed text-sm sm:text-base font-inter group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
              
              {/* Shimmer effect */}
              <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;