import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface MediaGalleryBuilderProps {
  onChange: (embeds: any[]) => void;
}

const MediaGalleryBuilder = ({ onChange }: MediaGalleryBuilderProps) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const embeds = images
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ image: { url } }));
    onChange(embeds);
  }, [images, onChange]);

  const addImage = () => setImages([...images, ""]);
  const removeImage = (index: number) => setImages(images.filter((_, i) => i !== index));
  const updateImage = (index: number, value: string) => {
    const next = [...images];
    next[index] = value;
    setImages(next);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Media Gallery</h2>
        <Button type="button" variant="outline" onClick={addImage}>
          <Plus className="w-4 h-4 mr-2" /> Add Image
        </Button>
      </div>

      {images.length === 0 && (
        <p className="text-sm text-muted-foreground">Add image URLs to include a gallery. Each image becomes its own embed.</p>
      )}

      <div className="space-y-3">
        {images.map((url, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <div className="flex-1 space-y-1">
              <Label htmlFor={`img-${idx}`}>Image URL #{idx + 1}</Label>
              <Input
                id={`img-${idx}`}
                placeholder="https://example.com/image.png"
                value={url}
                onChange={(e) => updateImage(idx, e.target.value)}
              />
            </div>
            <Button type="button" variant="ghost" onClick={() => removeImage(idx)} aria-label="Remove image">
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MediaGalleryBuilder;
