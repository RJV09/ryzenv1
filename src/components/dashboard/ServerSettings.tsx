import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Shield, Bell, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ServerSettingsProps {
  serverId: string;
}

const ServerSettings = ({ serverId }: ServerSettingsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ['server-config', serverId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('server_configs')
        .select('*')
        .eq('guild_id', serverId)
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!serverId && !!user?.id
  });

  const updateConfig = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from('server_configs')
        .update(updates)
        .eq('guild_id', serverId)
        .eq('user_id', user?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['server-config', serverId] });
      toast({
        title: "Settings saved",
        description: "Your server settings have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings. Please try again.",
      });
      console.error(error);
    }
  });

  if (isLoading || !config) {
    return (
      <Card className="glass border-glass-border animate-pulse">
        <CardContent className="p-6">
          <div className="h-96 bg-muted/20 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome System */}
      <Card className="glass border-glass-border hover:shadow-card-hover transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Welcome System
          </CardTitle>
          <CardDescription>
            Configure welcome messages for new members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="welcome-enabled">Enable Welcome Messages</Label>
            <Switch 
              id="welcome-enabled"
              checked={config.welcome_enabled}
              onCheckedChange={(checked) => 
                updateConfig.mutate({ welcome_enabled: checked })
              }
            />
          </div>
          
          {config.welcome_enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="welcome-channel">Welcome Channel ID</Label>
                <Input 
                  id="welcome-channel"
                  placeholder="Enter channel ID"
                  defaultValue={config.welcome_channel_id || ""}
                  onBlur={(e) => 
                    updateConfig.mutate({ welcome_channel_id: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea 
                  id="welcome-message"
                  placeholder="Use {user} for username, {server} for server name"
                  defaultValue={config.welcome_message || ""}
                  rows={3}
                  onBlur={(e) => 
                    updateConfig.mutate({ welcome_message: e.target.value })
                  }
                />
                <p className="text-xs text-text-muted">
                  Available variables: {"{user}"}, {"{server}"}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Auto Moderation */}
      <Card className="glass border-glass-border hover:shadow-card-hover transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Auto Moderation
          </CardTitle>
          <CardDescription>
            Protect your server from spam and malicious content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="automod-enabled">Enable Auto Moderation</Label>
            <Switch 
              id="automod-enabled"
              checked={config.automod_enabled}
              onCheckedChange={(checked) => 
                updateConfig.mutate({ automod_enabled: checked })
              }
            />
          </div>
          
          {config.automod_enabled && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="delete-spam">Delete Spam Messages</Label>
                <Switch 
                  id="delete-spam"
                  checked={config.automod_delete_spam}
                  onCheckedChange={(checked) => 
                    updateConfig.mutate({ automod_delete_spam: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="delete-invites">Delete Discord Invites</Label>
                <Switch 
                  id="delete-invites"
                  checked={config.automod_delete_invites}
                  onCheckedChange={(checked) => 
                    updateConfig.mutate({ automod_delete_invites: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="delete-links">Delete Suspicious Links</Label>
                <Switch 
                  id="delete-links"
                  checked={config.automod_delete_links}
                  onCheckedChange={(checked) => 
                    updateConfig.mutate({ automod_delete_links: checked })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Logging System */}
      <Card className="glass border-glass-border hover:shadow-card-hover transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Logging System
          </CardTitle>
          <CardDescription>
            Track server events and member activities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="logs-enabled">Enable Logging</Label>
            <Switch 
              id="logs-enabled"
              checked={config.logs_enabled}
              onCheckedChange={(checked) => 
                updateConfig.mutate({ logs_enabled: checked })
              }
            />
          </div>
          
          {config.logs_enabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="logs-channel">Logs Channel ID</Label>
                <Input 
                  id="logs-channel"
                  placeholder="Enter channel ID for logs"
                  defaultValue={config.logs_channel_id || ""}
                  onBlur={(e) => 
                    updateConfig.mutate({ logs_channel_id: e.target.value })
                  }
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={config.log_member_join}
                    onCheckedChange={(checked) => 
                      updateConfig.mutate({ log_member_join: checked })
                    }
                  />
                  <Label className="text-sm">Member Joins</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={config.log_member_leave}
                    onCheckedChange={(checked) => 
                      updateConfig.mutate({ log_member_leave: checked })
                    }
                  />
                  <Label className="text-sm">Member Leaves</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={config.log_message_delete}
                    onCheckedChange={(checked) => 
                      updateConfig.mutate({ log_message_delete: checked })
                    }
                  />
                  <Label className="text-sm">Message Deletes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={config.log_message_edit}
                    onCheckedChange={(checked) => 
                      updateConfig.mutate({ log_message_edit: checked })
                    }
                  />
                  <Label className="text-sm">Message Edits</Label>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerSettings;
