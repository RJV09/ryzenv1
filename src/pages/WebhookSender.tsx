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
  const [content, setContent] = useState("");
  const [embed, setEmbed] = useState<any>(null);
  
  const [components, setComponents] = useState<any[]>([]);
  const [componentsMediaEmbeds, setComponentsMediaEmbeds] = useState<any[]>([]);
  const [componentsThumbnailEmbeds, setComponentsThumbnailEmbeds] = useState<any[]>([]);
  const [componentsAttachments, setComponentsAttachments] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (!content && !embed && componentsMediaEmbeds.length === 0 && componentsThumbnailEmbeds.length === 0 && components.length === 0) {
      toast.error("Please add content, an embed, media, or components");
      return;
    }

    setIsSending(true);

    try {
      const payload: any = {};
      
      // Merge content with attachment links (URLs)
      const attachmentLinks = componentsAttachments.length > 0 ? componentsAttachments.map((u) => `<${u}>`).join("\n") : "";
      const mergedContent = [content, attachmentLinks].filter(Boolean).join("\n");
      if (mergedContent) {
        payload.content = mergedContent;
      }

      const embeds: any[] = [];
      if (embed) embeds.push(embed);
      
      if (componentsMediaEmbeds.length > 0) embeds.push(...componentsMediaEmbeds);
      if (componentsThumbnailEmbeds.length > 0) embeds.push(...componentsThumbnailEmbeds);
      if (embeds.length > 0) payload.embeds = embeds;

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

  const previewContent = [content, componentsAttachments.map((u) => `<${u}>`).join("\n")].filter(Boolean).join("\n");

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
            <div className="space-y-2">
              <Label htmlFor="content">Message Content (optional)</Label>
              <Input
                id="content"
                placeholder="Type your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                  <ComponentsBuilder 
                    onComponentsChange={setComponents}
                    onMediaChange={setComponentsMediaEmbeds}
                    onThumbnailsChange={setComponentsThumbnailEmbeds}
                    onAttachmentsChange={setComponentsAttachments}
                  />
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
              <MessagePreview content={previewContent} embed={embed} components={components} galleryEmbeds={[...componentsMediaEmbeds, ...componentsThumbnailEmbeds]} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WebhookSender;
