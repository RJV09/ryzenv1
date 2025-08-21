import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Ready to enhance your Discord server?</h3>
          <p className="text-text-muted mb-6">
            Join thousands of servers already using Ryzen V1 to create amazing communities.
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 shadow-glow transition-all duration-300 text-lg px-8 py-6"
          >
            Add Ryzen V1 to Discord →
          </Button>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Ryzen V1</span>
            </div>
            <div className="text-text-muted text-sm">
              © 2024 Ryzen V1. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;