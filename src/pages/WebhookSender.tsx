import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import EmbedBuilder from "@/components/webhook/EmbedBuilder";
import ComponentsBuilder from "@/components/webhook/ComponentsBuilder";
import MessagePreview from "@/components/webhook/MessagePreview";

const WebhookSender = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [embed, setEmbed] = useState<any>(null);
  const [components, setComponents] = useState<any[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (!embed && components.length === 0) {
      toast.error("Please create an embed or add components");
      return;
    }

    setIsSending(true);

    try {
      const payload: any = {};
      
      if (embed) {
        payload.embeds = [embed];
      }

      if (components.length > 0) {
        payload.components = components;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
      } else {
        const error = await response.text();
        toast.error(`Failed to send: ${error}`);
      }
    } catch (error) {
      console.error("Error sending webhook:", error);
      toast.error("Failed to send webhook");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Discord Webhook Sender
            </h1>
            <p className="text-muted-foreground">
              Create embeds and components, then send them to your Discord webhook
            </p>
          </div>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input
                id="webhook"
                type="url"
                placeholder="https://discord.com/api/webhooks/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Tabs defaultValue="embed" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="embed">Embed Builder</TabsTrigger>
                  <TabsTrigger value="components">Components v2</TabsTrigger>
                </TabsList>
                
                <TabsContent value="embed" className="mt-6">
                  <EmbedBuilder onEmbedChange={setEmbed} />
                </TabsContent>
                
                <TabsContent value="components" className="mt-6">
                  <ComponentsBuilder onComponentsChange={setComponents} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Button 
                  size="lg"
                  onClick={handleSend}
                  disabled={isSending}
                  className="px-8"
                >
                  {isSending ? "Sending..." : "Send to Webhook"}
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <MessagePreview embed={embed} components={components} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebhookSender;
