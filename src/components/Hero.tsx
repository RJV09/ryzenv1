import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useBotStats } from "@/hooks/useBotStats";

const Hero = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();
  const { stats, loading } = useBotStats();
  
  const serversCount = useCountUp(stats.servers || 0, 2000, statsVisible);
  const usersCount = useCountUp(stats.users || 0, 2500, statsVisible);
  const uptimeCount = useCountUp(stats.uptime || 0, 2000, statsVisible);

  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-gradient relative overflow-hidden px-4 sm:px-6 pt-20">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-hero-overlay opacity-60"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto text-center max-w-5xl relative z-10" ref={heroRef}>
        <div className={`mb-6 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <span className="text-text-muted uppercase tracking-widest text-sm font-semibold">
            Next-gen Discord Bot
          </span>
        </div>
        
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-space mb-6 leading-tight ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Meet <span className="text-primary glow animate-pulse-glow">Ryzen V1</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-foreground to-text-purple bg-clip-text text-transparent">
            Your Ultimate Discord Assistant
          </span>
        </h1>
        
        <p className={`text-lg sm:text-xl lg:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed font-inter ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          Elevate your Discord server with AI-powered moderation, 
          customizable welcome messages, music streaming, and powerful utilities.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${heroVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark shadow-button transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold animate-pulse-glow"
            asChild
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1181178429010354176&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
              Add to Discord →
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-glass-border glass hover:bg-primary/10 text-base sm:text-lg px-6 sm:px-8 py-6 font-semibold hover:scale-105 transition-all duration-300"
          >
            Explore Features
          </Button>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto ${statsVisible ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="text-center group">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2 font-space glow group-hover:scale-110 transition-transform duration-300">
              {loading ? '...' : `${serversCount.toLocaleString()}+`}
            </div>
            <div className="text-text-muted font-medium text-sm sm:text-base">Active Servers</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2 font-space glow group-hover:scale-110 transition-transform duration-300">
              {loading ? '...' : (usersCount >= 1000 ? `${Math.floor(usersCount / 1000)}k+` : `${usersCount}+`)}
            </div>
            <div className="text-text-muted font-medium text-sm sm:text-base">Users</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-2 font-space glow group-hover:scale-110 transition-transform duration-300">
              {loading ? '...' : `${uptimeCount}%`}
            </div>
            <div className="text-text-muted font-medium text-sm sm:text-base">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;