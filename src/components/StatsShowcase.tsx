import { TrendingUp, Zap, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StatsShowcase = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const stats = [
    { icon: TrendingUp, label: "Growth Rate", value: "300%", color: "from-primary to-secondary" },
    { icon: Zap, label: "Response Time", value: "<50ms", color: "from-secondary to-accent" },
    { icon: Award, label: "User Rating", value: "4.9/5", color: "from-accent to-primary" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-6 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-card-gradient border border-glass-border glass hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} p-[2px] mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2 font-space">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm sm:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;
