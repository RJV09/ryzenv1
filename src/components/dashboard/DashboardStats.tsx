import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Users, Activity, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardStats = () => {
  const { user } = useAuth();

  const { data: serverCount } = useQuery({
    queryKey: ['server-count', user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from('server_configs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);
      return count || 0;
    },
    enabled: !!user?.id
  });

  const { data: botStats } = useQuery({
    queryKey: ['bot-stats'],
    queryFn: async () => {
      const { data } = await supabase
        .from('bot_stats')
        .select('stat_name, stat_value')
        .in('stat_name', ['total_servers', 'total_users', 'uptime']);
      
      const stats = data?.reduce((acc, curr) => {
        acc[curr.stat_name] = curr.stat_value;
        return acc;
      }, {} as Record<string, number>);
      
      return stats || { total_servers: 0, total_users: 0, uptime: 0 };
    }
  });

  const stats = [
    {
      icon: Server,
      label: "Your Servers",
      value: serverCount?.toString() || "0",
      color: "from-primary to-secondary"
    },
    {
      icon: Users,
      label: "Total Bot Users",
      value: botStats?.total_users ? `${Math.floor(botStats.total_users / 1000)}k+` : "0",
      color: "from-secondary to-accent"
    },
    {
      icon: Activity,
      label: "Bot Uptime",
      value: `${botStats?.uptime || 0}%`,
      color: "from-accent to-primary"
    },
    {
      icon: Shield,
      label: "Protected",
      value: "Active",
      color: "from-primary to-accent"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="group relative glass border-glass-border hover:shadow-glow transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10 opacity-50"></div>
          
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} p-[1px] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                <div className="w-full h-full rounded-xl bg-background/95 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl sm:text-4xl font-bold text-gradient font-space tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-text-muted font-semibold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
