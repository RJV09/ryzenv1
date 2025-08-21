import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary glow">Ryzen V1</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#showcase" className="text-muted-foreground hover:text-primary transition-colors">
              Showcase
            </a>
          </div>

          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90 shadow-glow transition-all duration-300"
            asChild
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1181178429010354176&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
              Add to Discord
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;