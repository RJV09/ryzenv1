import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Footer = () => {
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLElement>();
  
  return (
    <footer className="py-16 sm:py-20 px-4 sm:px-6 bg-background border-t border-glass-border" ref={footerRef}>
      <div className="container mx-auto max-w-5xl text-center">
        <div className={`mb-12 ${footerVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-space mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Ready to enhance your Discord server?
          </h3>
          <p className="text-text-muted mb-8 text-base sm:text-lg lg:text-xl font-inter max-w-2xl mx-auto leading-relaxed">
            Join thousands of servers already using Ryzen V1 to create amazing communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className={`bg-primary hover:bg-primary-dark shadow-button transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold animate-pulse-glow ${footerVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
              asChild
            >
              <a href="https://discord.com/oauth2/authorize?client_id=1187059297570525255&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
                Add Ryzen V1 to Discord →
              </a>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className={`border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold ${footerVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
              asChild
            >
              <a href="https://discord.gg/tKtAzx4Z9v" target="_blank" rel="noopener noreferrer">
                Join Support Server
              </a>
            </Button>
          </div>
        </div>
        
        <div className={`border-t border-glass-border pt-8 ${footerVisible ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold font-space text-primary glow">Ryzen V1</span>
            </div>
            <div className="text-text-muted text-sm sm:text-base font-medium">
              © 2024 Ryzen V1. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;