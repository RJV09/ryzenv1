import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import PricingShowcase from "@/components/PricingShowcase";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import StatsShowcase from "@/components/StatsShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <Hero />
      <StatsShowcase />
      <Features />
      <Testimonials />
      <PricingShowcase />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
