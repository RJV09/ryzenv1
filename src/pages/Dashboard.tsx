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
    <div className="min-h-screen bg-background pt-20 pb-12 px-3 sm:px-4 lg:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10" ref={ref}>
        {/* Header */}
        <div className={`mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px]">
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-gradient">
              Dashboard
            </h1>
          </div>
          <p className="text-text-muted text-base sm:text-lg font-medium">
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
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 glass border-glass-border p-2 backdrop-blur-xl">
              <TabsTrigger 
                value="servers" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-glow transition-all duration-500 rounded-lg"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Servers</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-glow transition-all duration-500 rounded-lg"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Settings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="moderation"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-glow transition-all duration-500 rounded-lg"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Moderation</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-glow transition-all duration-500 rounded-lg"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline font-semibold">Analytics</span>
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
              <Card className="glass border-glass-border hover:shadow-glow transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-[1px]">
                      <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                        <Shield className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <span className="text-gradient">Auto Moderation</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    Configure automatic moderation rules for your servers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="group p-6 rounded-xl bg-gradient-to-br from-card via-card to-card/50 border border-glass-border hover:border-primary/50 hover:shadow-glow transition-all duration-500">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gradient transition-colors duration-300">Spam Protection</h3>
                      <p className="text-sm text-text-muted mb-4">
                        Automatically detect and remove spam messages.
                      </p>
                      <Button variant="premium" size="sm" className="w-full">Configure</Button>
                    </div>
                    <div className="group p-6 rounded-xl bg-gradient-to-br from-card via-card to-card/50 border border-glass-border hover:border-primary/50 hover:shadow-glow transition-all duration-500">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gradient transition-colors duration-300">Link Filtering</h3>
                      <p className="text-sm text-text-muted mb-4">
                        Block suspicious links and prevent invite spam.
                      </p>
                      <Button variant="premium" size="sm" className="w-full">Configure</Button>
                    </div>
                    <div className="group p-6 rounded-xl bg-gradient-to-br from-card via-card to-card/50 border border-glass-border hover:border-primary/50 hover:shadow-glow transition-all duration-500">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-red-500 p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-gradient transition-colors duration-300">Anti-Raid Protection</h3>
                      <p className="text-sm text-text-muted mb-4">
                        Protect your server from coordinated raids.
                      </p>
                      <Button variant="premium" size="sm" className="w-full">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="glass border-glass-border hover:shadow-glow transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent p-[1px]">
                      <div className="w-full h-full rounded-lg bg-background flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <span className="text-gradient">Server Analytics</span>
                  </CardTitle>
                  <CardDescription className="text-base">
                    View detailed analytics and insights for your servers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16 text-text-muted">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-6 flex items-center justify-center">
                      <Bell className="w-10 h-10 text-primary/50" />
                    </div>
                    <p className="text-lg font-semibold">Analytics features coming soon!</p>
                    <p className="text-sm mt-2">Get insights into your server's performance and user engagement.</p>
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
