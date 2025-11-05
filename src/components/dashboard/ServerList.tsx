import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Settings, ExternalLink } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ServerListProps {
  onSelectServer: (serverId: string) => void;
}

const ServerList = ({ onSelectServer }: ServerListProps) => {
  const { user } = useAuth();

  const { data: servers, isLoading } = useQuery({
    queryKey: ['servers', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('server_configs')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="glass border-glass-border animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted/20 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!servers || servers.length === 0) {
    return (
      <Card className="glass border-glass-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Your Servers
          </CardTitle>
          <CardDescription>
            No servers found. Add the bot to your Discord server to get started!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="default"
            size="lg"
            className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-glow"
            asChild
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1187059297570525255&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Add Bot to Server
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass border-glass-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Your Servers ({servers.length})
          </CardTitle>
          <CardDescription>
            Manage settings and configurations for each server.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servers.map((server, index) => (
          <Card 
            key={server.id}
            className="group glass border-glass-border hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {server.guild_icon ? (
                    <img 
                      src={`https://cdn.discordapp.com/icons/${server.guild_id}/${server.guild_icon}.png`}
                      alt={server.guild_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Server className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
                      {server.guild_name}
                    </h3>
                    <p className="text-xs text-text-muted">
                      ID: {server.guild_id}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Prefix:</span>
                  <span className="font-mono font-semibold">{server.prefix}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Auto Moderation:</span>
                  <span className={server.automod_enabled ? "text-green-500" : "text-text-muted"}>
                    {server.automod_enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-muted">Welcome System:</span>
                  <span className={server.welcome_enabled ? "text-green-500" : "text-text-muted"}>
                    {server.welcome_enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm"
                className="w-full group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300"
                onClick={() => onSelectServer(server.guild_id)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configure Server
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServerList;
