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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-3 sm:px-4 lg:px-6 pt-16 sm:pt-20">
      {/* Enhanced background layers with better mobile performance */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90"></div>
      <div className="absolute inset-0 bg-hero-mesh opacity-40 sm:opacity-60"></div>
      <div className="absolute inset-0 bg-hero-overlay opacity-70 sm:opacity-80"></div>
      
      {/* Optimized floating particles for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-primary/30 sm:bg-primary/40 rounded-full animate-particle-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-secondary/40 sm:bg-secondary/50 rounded-full animate-particle-float" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-accent/25 sm:bg-accent/35 rounded-full animate-particle-float" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-primary/50 sm:bg-primary/60 rounded-full animate-particle-float" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
      </div>
      
      {/* Enhanced morphing gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full blur-2xl sm:blur-3xl animate-morph-gradient opacity-40 sm:opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl sm:blur-2xl animate-morph-gradient opacity-30 sm:opacity-50" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}></div>
      
      <div className="container mx-auto text-center max-w-6xl relative z-10 px-3 sm:px-4" ref={heroRef}>
        <div className={`mb-4 sm:mb-6 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <span className="text-text-muted uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm font-medium sm:font-semibold">
            Next-gen Discord Bot
          </span>
        </div>
        
        <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-space mb-3 sm:mb-4 lg:mb-6 leading-tight ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Meet <span className="text-gradient relative inline-block">
            Ryzen V1
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </span>
          <br />
          <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl bg-gradient-to-r from-foreground via-text-cyan to-text-pink bg-clip-text text-transparent leading-tight block mt-2 sm:mt-3">
            Your Ultimate Discord Assistant
          </span>
        </h1>
        
        <p className={`text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl text-text-muted mb-6 sm:mb-8 lg:mb-10 max-w-3xl xl:max-w-4xl mx-auto leading-relaxed font-inter px-2 sm:px-4 ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          Elevate your Discord server with AI-powered moderation, 
          customizable welcome messages, music streaming, and powerful utilities.
        </p>
        
        <div className={`flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4 ${heroVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg"
            className="relative bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover shadow-button transition-all duration-300 hover:scale-105 active:scale-95 text-xs xs:text-sm sm:text-base lg:text-lg px-4 xs:px-6 sm:px-8 lg:px-10 py-3 xs:py-4 sm:py-5 lg:py-6 font-semibold overflow-hidden group w-full xs:w-auto"
            asChild
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1187059297570525255&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
              <span className="relative z-10">Add to Discord →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="relative border-2 border-glass-border glass hover:bg-primary/20 hover:border-primary/50 text-xs xs:text-sm sm:text-base lg:text-lg px-4 xs:px-6 sm:px-8 lg:px-10 py-3 xs:py-4 sm:py-5 lg:py-6 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 group overflow-hidden w-full xs:w-auto"
          >
            <span className="relative z-10">Explore Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 lg:gap-12 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-4 ${statsVisible ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="text-center group cursor-pointer p-3 sm:p-4 rounded-xl hover:bg-glass-bg/50 transition-all duration-300">
            <div className="relative">
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-1 sm:mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : `${serversCount.toLocaleString()}+`}
              </div>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs sm:text-sm lg:text-base group-hover:text-foreground transition-colors duration-300">Active Servers</div>
          </div>
          <div className="text-center group cursor-pointer p-3 sm:p-4 rounded-xl hover:bg-glass-bg/50 transition-all duration-300">
            <div className="relative">
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-1 sm:mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : (usersCount >= 1000 ? `${Math.floor(usersCount / 1000)}k+` : `${usersCount}+`)}
              </div>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-secondary/20 to-accent/20 blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs sm:text-sm lg:text-base group-hover:text-foreground transition-colors duration-300">Users</div>
          </div>
          <div className="text-center group cursor-pointer p-3 sm:p-4 rounded-xl hover:bg-glass-bg/50 transition-all duration-300">
            <div className="relative">
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gradient mb-1 sm:mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : `${uptimeCount}%`}
              </div>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-accent/20 to-primary/20 blur-lg sm:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs sm:text-sm lg:text-base group-hover:text-foreground transition-colors duration-300">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;