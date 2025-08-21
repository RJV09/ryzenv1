import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl sm:text-3xl font-bold font-space text-primary glow">
              Ryzen V1
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              How It Works
            </a>
            <a 
              href="#showcase" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Showcase
            </a>
          </div>

          {/* Desktop CTA */}
          <Button 
            variant="default" 
            className="hidden md:inline-flex bg-primary hover:bg-primary-dark shadow-button transition-all duration-300 hover:scale-105 font-semibold"
            asChild
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1181178429010354176&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
              Add to Discord
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <a 
              href="#features" 
              className="block text-muted-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="block text-muted-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#showcase" 
              className="block text-muted-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Showcase
            </a>
            <Button 
              variant="default" 
              className="w-full bg-primary hover:bg-primary-dark shadow-button transition-all duration-300 font-semibold"
              asChild
            >
              <a href="https://discord.com/oauth2/authorize?client_id=1181178429010354176&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
                Add to Discord
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;