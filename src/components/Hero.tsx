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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-20">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-hero-mesh opacity-60"></div>
      <div className="absolute inset-0 bg-hero-overlay opacity-80"></div>
      
      {/* Advanced floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/40 rounded-full animate-[particleFloat_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-secondary/50 rounded-full animate-[particleFloat_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-accent/35 rounded-full animate-[particleFloat_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-[particleFloat_5s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-secondary/45 rounded-full animate-[particleFloat_9s_ease-in-out_infinite]" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/6 w-1 h-1 bg-accent/50 rounded-full animate-[particleFloat_6s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Morphing gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-[morphGradient_8s_ease-in-out_infinite] opacity-60"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/25 to-primary/25 rounded-full blur-2xl animate-[morphGradient_10s_ease-in-out_infinite_reverse] opacity-50"></div>
      
      <div className="container mx-auto text-center max-w-5xl relative z-10" ref={heroRef}>
        <div className={`mb-6 ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <span className="text-text-muted uppercase tracking-widest text-sm font-semibold">
            Next-gen Discord Bot
          </span>
        </div>
        
        <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-space mb-4 sm:mb-6 leading-tight ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Meet <span className="text-gradient relative">
            Ryzen V1
          </span>
          <br />
          <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-foreground via-text-cyan to-text-pink bg-clip-text text-transparent">
            Your Ultimate Discord Assistant
          </span>
        </h1>
        
        <p className={`text-base xs:text-lg sm:text-xl lg:text-2xl text-text-muted mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed font-inter px-4 ${heroVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          Elevate your Discord server with AI-powered moderation, 
          customizable welcome messages, music streaming, and powerful utilities.
        </p>
        
        <div className={`flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 ${heroVisible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <Button 
            size="lg"
            className="relative bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-button-hover shadow-button transition-all duration-300 hover:scale-105 text-sm xs:text-base sm:text-lg px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 font-semibold overflow-hidden group w-full xs:w-auto"
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
            className="relative border-2 border-glass-border glass-strong hover:bg-primary/20 hover:border-primary/50 text-sm xs:text-base sm:text-lg px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 font-semibold hover:scale-105 transition-all duration-300 group overflow-hidden w-full xs:w-auto"
          >
            <span className="relative z-10">Explore Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
        
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 xs:grid-cols-3 gap-6 xs:gap-8 sm:gap-12 max-w-4xl mx-auto px-4 ${statsVisible ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : `${serversCount.toLocaleString()}+`}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs xs:text-sm sm:text-base group-hover:text-foreground transition-colors duration-300">Active Servers</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : (usersCount >= 1000 ? `${Math.floor(usersCount / 1000)}k+` : `${usersCount}+`)}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs xs:text-sm sm:text-base group-hover:text-foreground transition-colors duration-300">Users</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="relative">
              <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-2 font-space group-hover:scale-110 transition-all duration-300">
                {loading ? '...' : `${uptimeCount}%`}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <div className="text-text-muted font-medium text-xs xs:text-sm sm:text-base group-hover:text-foreground transition-colors duration-300">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;