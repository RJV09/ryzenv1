import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface EmbedBuilderProps {
  onEmbedChange: (embed: any) => void;
}

const EmbedBuilder = ({ onEmbedChange }: EmbedBuilderProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#5865F2");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [image, setImage] = useState("");
  const [footer, setFooter] = useState("");
  const [footerIcon, setFooterIcon] = useState("");
  const [author, setAuthor] = useState("");
  const [authorIcon, setAuthorIcon] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");
  const [timestamp, setTimestamp] = useState(false);
  const [fields, setFields] = useState<Array<{ name: string; value: string; inline: boolean }>>([]);

  useEffect(() => {
    const embed: any = {};
    
    if (title) embed.title = title;
    if (description) embed.description = description;
    if (color) embed.color = parseInt(color.replace("#", ""), 16);
    if (url) embed.url = url;
    if (thumbnail) embed.thumbnail = { url: thumbnail };
    if (image) embed.image = { url: image };
    if (timestamp) embed.timestamp = new Date().toISOString();
    if (footer) {
      embed.footer = { text: footer };
      if (footerIcon) embed.footer.icon_url = footerIcon;
    }
    if (author) {
      embed.author = { name: author };
      if (authorIcon) embed.author.icon_url = authorIcon;
      if (authorUrl) embed.author.url = authorUrl;
    }
    if (fields.length > 0) {
      embed.fields = fields.filter(f => f.name && f.value);
    }

    onEmbedChange(Object.keys(embed).length > 0 ? embed : null);
  }, [title, description, color, url, thumbnail, image, timestamp, footer, footerIcon, author, authorIcon, authorUrl, fields, onEmbedChange]);

  const addField = () => {
    setFields([...fields, { name: "", value: "", inline: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: any) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    setFields(newFields);
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Embed Builder</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Embed title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Embed description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input
            id="thumbnail"
            type="url"
            placeholder="https://example.com/image.png"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          placeholder="https://example.com/image.png"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorIcon">Author Icon URL</Label>
          <Input
            id="authorIcon"
            type="url"
            placeholder="https://example.com/icon.png"
            value={authorIcon}
            onChange={(e) => setAuthorIcon(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="authorUrl">Author URL</Label>
        <Input
          id="authorUrl"
          type="url"
          placeholder="https://example.com"
          value={authorUrl}
          onChange={(e) => setAuthorUrl(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="footer">Footer Text</Label>
          <Input
            id="footer"
            placeholder="Footer text"
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="footerIcon">Footer Icon URL</Label>
          <Input
            id="footerIcon"
            type="url"
            placeholder="https://example.com/icon.png"
            value={footerIcon}
            onChange={(e) => setFooterIcon(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="timestamp"
          checked={timestamp}
          onChange={(e) => setTimestamp(e.target.checked)}
          className="rounded border-border"
        />
        <Label htmlFor="timestamp">Add Timestamp</Label>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Fields</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addField}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center mb-2">
              <Label>Field {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeField(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Field name"
              value={field.name}
              onChange={(e) => updateField(index, "name", e.target.value)}
            />
            <Textarea
              placeholder="Field value"
              value={field.value}
              onChange={(e) => updateField(index, "value", e.target.value)}
              rows={2}
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={field.inline}
                onChange={(e) => updateField(index, "inline", e.target.checked)}
              />
              <span className="text-sm">Inline</span>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EmbedBuilder;
