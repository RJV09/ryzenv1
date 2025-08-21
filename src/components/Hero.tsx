import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-gradient px-6 pt-20">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="mb-6">
          <span className="text-text-muted uppercase tracking-wide text-sm">
            Next-gen Discord Bot
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Meet <span className="text-primary glow">Ryzen V1</span>
          <br />
          <span className="text-4xl md:text-5xl">Your Ultimate Discord Assistant</span>
        </h1>
        
        <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
          Elevate your Discord server with AI-powered moderation, 
          customizable welcome messages, music streaming, and powerful utilities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-glow transition-all duration-300 text-lg px-8 py-6"
          >
            Add to Discord →
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border bg-transparent hover:bg-muted text-lg px-8 py-6"
          >
            Explore Features
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">80+</div>
            <div className="text-text-muted">Active Servers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8k+</div>
            <div className="text-text-muted">Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-text-muted">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;