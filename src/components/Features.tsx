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
        <div className={`text-center mb-12 sm:mb-16 ${featuresVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={featuresRef}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-inter">
            Everything you need to create an engaging, well-moderated, and fun Discord community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-card-gradient border-glass-border glass hover:shadow-feature transition-all duration-500 group hover:-translate-y-2 cursor-pointer ${featuresVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl sm:text-2xl text-foreground font-space group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-text-muted leading-relaxed text-sm sm:text-base font-inter group-hover:text-foreground transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;