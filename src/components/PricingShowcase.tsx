import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PricingShowcase = () => {
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollAnimation<HTMLDivElement>();
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for small servers",
      icon: Zap,
      features: [
        "Basic moderation",
        "Music playback",
        "Welcome messages",
        "Up to 100 members",
        "Community support"
      ],
      popular: false,
      gradient: "from-muted/20 to-muted/10"
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Best for growing communities",
      icon: Crown,
      features: [
        "Advanced moderation",
        "High-quality music",
        "Custom welcome system",
        "Unlimited members",
        "Priority support",
        "Custom commands",
        "Advanced analytics"
      ],
      popular: true,
      gradient: "from-primary/20 to-secondary/20"
    },
    {
      name: "Enterprise",
      price: "$29.99",
      description: "For large organizations",
      icon: Sparkles,
      features: [
        "Everything in Premium",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
        "Custom development"
      ],
      popular: false,
      gradient: "from-accent/20 to-primary/20"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-mesh opacity-30"></div>
      <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-3xl animate-[morphGradient_20s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-2xl animate-[morphGradient_16s_ease-in-out_infinite_reverse]"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-4 ${pricingVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={pricingRef}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 text-gradient">
            Choose Your Plan
          </h2>
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-inter">
            Start free and upgrade as your community grows
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-3 cursor-pointer overflow-hidden ${plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''} ${pricingVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-semibold text-white animate-pulse-glow">
                  Most Popular
                </div>
              )}
              
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${plan.popular ? 'bg-gradient-to-br from-primary/20 to-secondary/20' : 'bg-muted/20'}`}>
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'} group-hover:text-primary transition-colors duration-300`} />
                </div>
                <CardTitle className="text-xl xs:text-2xl sm:text-3xl text-foreground font-space group-hover:text-gradient transition-colors duration-300">
                  {plan.name}
                </CardTitle>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 font-space group-hover:scale-110 transition-transform duration-300">
                  {plan.price}
                  <span className="text-lg text-text-muted font-normal">/month</span>
                </div>
                <CardDescription className="text-text-muted group-hover:text-foreground transition-colors duration-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm sm:text-base">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-text-muted group-hover:text-foreground transition-colors duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-primary to-secondary hover:shadow-button-hover shadow-button' 
                    : 'bg-muted hover:bg-primary/20'} transition-all duration-500 hover:scale-105 font-semibold`}
                >
                  Get Started
                </Button>
              </CardContent>
              
              {/* Shimmer effect */}
              <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
            </Card>
          ))}
        </div>
        
        <div className={`text-center mt-12 ${pricingVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <p className="text-text-muted text-sm sm:text-base mb-4">
            All plans include 7-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-text-muted">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              99.9% uptime SLA
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              24/7 support
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingShowcase;