import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, BarChart3, Shield, Users, Bell } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ServerList from "@/components/dashboard/ServerList";
import ServerSettings from "@/components/dashboard/ServerSettings";

const Dashboard = () => {
  const { user } = useAuth();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12 px-3 sm:px-4 lg:px-6">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Header */}
        <div className={`mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-gradient mb-3">
            Dashboard
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            Welcome back, {user?.email}! Manage your Discord bot settings and servers.
          </p>
        </div>

        {/* Stats Overview */}
        <div className={`mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <DashboardStats />
        </div>

        {/* Main Content */}
        <div className={isVisible ? 'animate-slide-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="servers" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 bg-card/50 p-1">
              <TabsTrigger 
                value="servers" 
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Servers</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="moderation"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Moderation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="servers" className="space-y-6">
              <ServerList onSelectServer={setSelectedServer} />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {selectedServer ? (
                <ServerSettings serverId={selectedServer} />
              ) : (
                <Card className="glass border-glass-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Server Settings
                    </CardTitle>
                    <CardDescription>
                      Select a server from the Servers tab to manage its settings.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="moderation" className="space-y-6">
              <Card className="glass border-glass-border hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Auto Moderation
                  </CardTitle>
                  <CardDescription>
                    Configure automatic moderation rules for your servers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card-gradient border border-glass-border">
                      <h3 className="font-semibold mb-2">Spam Protection</h3>
                      <p className="text-sm text-text-muted mb-3">
                        Automatically detect and remove spam messages.
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 rounded-lg bg-card-gradient border border-glass-border">
                      <h3 className="font-semibold mb-2">Link Filtering</h3>
                      <p className="text-sm text-text-muted mb-3">
                        Block suspicious links and prevent invite spam.
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="p-4 rounded-lg bg-card-gradient border border-glass-border">
                      <h3 className="font-semibold mb-2">Anti-Raid Protection</h3>
                      <p className="text-sm text-text-muted mb-3">
                        Protect your server from coordinated raids.
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="glass border-glass-border hover:shadow-card-hover transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Server Analytics
                  </CardTitle>
                  <CardDescription>
                    View detailed analytics and insights for your servers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-text-muted">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics features coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
