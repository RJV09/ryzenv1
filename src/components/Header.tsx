import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-3 xs:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl xs:text-2xl sm:text-3xl font-bold font-space text-gradient">
              Ryzen V1
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium text-sm xl:text-base"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium text-sm xl:text-base"
            >
              How It Works
            </a>
            <a 
              href="#showcase" 
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium text-sm xl:text-base"
            >
              Showcase
            </a>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 xs:mt-4 pb-3 xs:pb-4 space-y-3 xs:space-y-4 animate-fade-in">
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