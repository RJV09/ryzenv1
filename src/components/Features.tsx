import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Music, Users, Ticket, Zap, Settings } from "lucide-react";

const Features = () => {
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
    <section id="features" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Everything you need to create an engaging, well-moderated, and fun Discord community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-feature-card border-border hover:shadow-card transition-all duration-300 group hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-text-muted leading-relaxed">
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