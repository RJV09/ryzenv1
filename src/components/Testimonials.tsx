import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation<HTMLDivElement>();
  
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Server Owner",
      server: "TechCommunity",
      avatar: "🚀",
      content: "Ryzen V1 transformed our server completely! The moderation is flawless and the music quality is incredible.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Community Manager", 
      server: "GamersUnited",
      avatar: "🎮",
      content: "Best bot we've ever used. The welcome system and ticket panel work perfectly together.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Discord Admin",
      server: "CreativeSpace",
      avatar: "🎨",
      content: "The utilities are amazing and the uptime is unbeatable. Our members love the music features!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-[morphGradient_15s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-2xl animate-[morphGradient_12s_ease-in-out_infinite_reverse]"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-4 ${testimonialsVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={testimonialsRef}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 text-gradient">
            Loved by Communities
          </h2>
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-inter">
            See what server owners and community managers say about Ryzen V1
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`relative bg-card-gradient hover:bg-card-gradient-hover border-glass-border glass hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-2 cursor-pointer overflow-hidden ${testimonialsVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-12 h-12 text-primary" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-accent fill-current animate-[breathe_2s_ease-in-out_infinite]" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-text-muted leading-relaxed text-sm sm:text-base font-inter mb-6 group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-muted">
                      {testimonial.role} • {testimonial.server}
                    </div>
                  </div>
                </div>
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

export default Testimonials;