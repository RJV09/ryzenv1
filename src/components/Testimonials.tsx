import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Testimonials = () => {
  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-morph-gradient opacity-60"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-2xl animate-morph-gradient opacity-60"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 px-4 ${testimonialsVisible ? 'animate-fade-in' : 'opacity-0'}`} ref={testimonialsRef}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 text-gradient">
            Community Reviews
          </h2>
          <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-inter mb-8">
            See what real Discord server owners say about Ryzen V1
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4">
          {/* Call to Action Card */}
          <Card className={`relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 group hover:-translate-y-3 cursor-pointer overflow-hidden ${testimonialsVisible ? 'animate-bounce-in' : 'opacity-0'}`}>
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-space font-semibold mb-4 text-foreground">
                Share Your Experience
              </h3>
              
              <p className="text-text-muted mb-6 leading-relaxed">
                Help other server owners discover Ryzen V1 by sharing your experience with our bot.
              </p>
              
              <Link to="/reviews" className="mt-auto">
                <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover transition-all duration-300 group-hover:scale-105">
                  Write a Review
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
            
            {/* Enhanced effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary/60 rounded-full animate-float"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-secondary/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
          </Card>

          {/* View All Reviews Card */}
          <Card className={`relative bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10 border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-500 group hover:-translate-y-3 cursor-pointer overflow-hidden ${testimonialsVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-secondary fill-current" />
              </div>
              
              <h3 className="text-xl font-space font-semibold mb-4 text-foreground">
                Read Community Reviews
              </h3>
              
              <p className="text-text-muted mb-6 leading-relaxed">
                Discover what Discord server owners are saying about their experience with Ryzen V1.
              </p>
              
              <Link to="/reviews" className="mt-auto">
                <Button variant="outline" className="w-full border-secondary/50 hover:bg-secondary/10 transition-all duration-300 group-hover:scale-105">
                  View All Reviews
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
            
            {/* Enhanced effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-4 left-4 w-1 h-1 bg-secondary/60 rounded-full animate-float"></div>
              <div className="absolute bottom-4 right-6 w-2 h-2 bg-accent/60 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
          </Card>

          {/* Discord Support Card */}
          <Card className={`relative bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 group hover:-translate-y-3 cursor-pointer overflow-hidden ${testimonialsVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8 text-center h-full flex flex-col justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl">💬</div>
              </div>
              
              <h3 className="text-xl font-space font-semibold mb-4 text-foreground">
                Join Our Community
              </h3>
              
              <p className="text-text-muted mb-6 leading-relaxed">
                Get support, share feedback, and connect with other Ryzen V1 users in our Discord server.
              </p>
              
              <a 
                href="https://discord.gg/tKtAzx4Z9v" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto"
              >
                <Button variant="outline" className="w-full border-accent/50 hover:bg-accent/10 transition-all duration-300 group-hover:scale-105">
                  Join Support Server
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </CardContent>
            
            {/* Enhanced effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-6 right-4 w-1 h-1 bg-accent/60 rounded-full animate-float"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;