import { useState, useCallback, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, FileIcon, Image, Type, Minus, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ComponentsBuilderProps {
  onComponentsChange: (components: any[]) => void;
  onMediaChange?: (embeds: any[]) => void;
  onThumbnailsChange?: (embeds: any[]) => void;
  onAttachmentsChange?: (attachments: string[]) => void;
}

const ComponentsBuilder = ({ 
  onComponentsChange, 
  onMediaChange, 
  onThumbnailsChange, 
  onAttachmentsChange 
}: ComponentsBuilderProps) => {
  const [actionRows, setActionRows] = useState<Array<{ type: number; components: any[] }>>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [accentColor, setAccentColorState] = useState<string>("");

  // Use refs to avoid dependency issues
  const onComponentsChangeRef = useRef(onComponentsChange);
  const onMediaChangeRef = useRef(onMediaChange);
  const onThumbnailsChangeRef = useRef(onThumbnailsChange);
  const onAttachmentsChangeRef = useRef(onAttachmentsChange);

  useEffect(() => {
    onComponentsChangeRef.current = onComponentsChange;
    onMediaChangeRef.current = onMediaChange;
    onThumbnailsChangeRef.current = onThumbnailsChange;
    onAttachmentsChangeRef.current = onAttachmentsChange;
  });

  // Emit components when action rows change
  useEffect(() => {
    const formattedRows = actionRows
      .filter(row => row.components.length > 0)
      .map(row => ({
        type: 1,
        components: row.components
      }));
    onComponentsChangeRef.current(formattedRows);
  }, [actionRows]);

  // Emit media embeds
  useEffect(() => {
    const embeds = mediaUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ image: { url } }));
    onMediaChangeRef.current?.(embeds);
  }, [mediaUrls]);

  // Emit thumbnail embeds
  useEffect(() => {
    const embeds = thumbnailUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ thumbnail: { url } }));
    onThumbnailsChangeRef.current?.(embeds);
  }, [thumbnailUrls]);

  // Emit attachments
  useEffect(() => {
    onAttachmentsChangeRef.current?.(attachments.map(u => u.trim()).filter(Boolean));
  }, [attachments]);

  // Action Row Methods
  const addActionRow = useCallback(() => {
    setActionRows(prev => [...prev, { type: 1, components: [] }]);
  }, []);

  const removeActionRow = useCallback((index: number) => {
    setActionRows(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addActionRowComponents = useCallback((rowIndex: number, componentType: string) => {
    setActionRows(prev => {
      const newRows = prev.map((row, i) => {
        if (i !== rowIndex) return row;
        const comps = [...row.components];
        
        switch (componentType) {
          case 'button':
            if (comps.length >= 5) return row;
            comps.push({
              type: 2,
              style: 1,
              label: "",
              custom_id: `btn_${Date.now()}`,
            });
            break;
          case 'stringSelect':
            if (comps.length > 0) return row;
            comps.push({
              type: 3,
              custom_id: `select_${Date.now()}`,
              placeholder: "Select an option",
              options: [],
              min_values: 1,
              max_values: 1,
            });
            break;
          case 'userSelect':
            if (comps.length > 0) return row;
            comps.push({
              type: 5,
              custom_id: `user_${Date.now()}`,
              placeholder: "Select a user",
              min_values: 1,
              max_values: 1,
            });
            break;
          case 'roleSelect':
            if (comps.length > 0) return row;
            comps.push({
              type: 6,
              custom_id: `role_${Date.now()}`,
              placeholder: "Select a role",
              min_values: 1,
              max_values: 1,
            });
            break;
          case 'channelSelect':
            if (comps.length > 0) return row;
            comps.push({
              type: 8,
              custom_id: `channel_${Date.now()}`,
              placeholder: "Select a channel",
              min_values: 1,
              max_values: 1,
            });
            break;
          case 'container':
            comps.push({
              type: 17,
              accent_color: undefined,
              spoiler: false,
              components: [],
              content: "",
            });
            break;
        }
        
        return { ...row, components: comps };
      });
      return newRows;
    });
  }, []);

  const addSeparator = useCallback((rowIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      return {
        ...row,
        components: [...row.components, { type: 12, divider: true }]
      };
    }));
  }, []);

  const addTextDisplay = useCallback((rowIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      return {
        ...row,
        components: [...row.components, { type: 13, content: "" }]
      };
    }));
  }, []);

  const addSectionComponents = useCallback((rowIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      return {
        ...row,
        components: [...row.components, { type: 14, label: "Section", components: [] }]
      };
    }));
  }, []);

  const removeComponent = useCallback((rowIndex: number, compIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      return {
        ...row,
        components: row.components.filter((_, j) => j !== compIndex)
      };
    }));
  }, []);

  const updateComponent = useCallback((rowIndex: number, compIndex: number, key: string, value: any) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex) return comp;
        
        const updated = { ...comp };
        
        if (key === 'style' && comp.type === 2) {
          if (value === 5) {
            delete updated.custom_id;
            updated.url = updated.url || "";
          } else {
            delete updated.url;
            updated.custom_id = updated.custom_id || `btn_${Date.now()}`;
          }
        }
        
        updated[key] = value;
        return updated;
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const addSelectOption = useCallback((rowIndex: number, compIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex) return comp;
        const options = comp.options || [];
        if (options.length >= 25) return comp;
        return {
          ...comp,
          options: [...options, { label: "", value: `opt_${Date.now()}`, description: "" }]
        };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const removeSelectOption = useCallback((rowIndex: number, compIndex: number, optIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex) return comp;
        return {
          ...comp,
          options: comp.options?.filter((_: any, k: number) => k !== optIndex) || []
        };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const updateSelectOption = useCallback((rowIndex: number, compIndex: number, optIndex: number, key: string, value: any) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex) return comp;
        const newOptions = comp.options?.map((opt: any, k: number) => {
          if (k !== optIndex) return opt;
          return { ...opt, [key]: value };
        }) || [];
        return { ...comp, options: newOptions };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  // Media/Attachment helpers
  const addMediaGallery = useCallback(() => {
    setMediaUrls(prev => [...prev, ""]);
  }, []);

  const addFileComponents = useCallback(() => {
    setAttachments(prev => [...prev, ""]);
  }, []);

  const addThumbnail = useCallback(() => {
    setThumbnailUrls(prev => [...prev, ""]);
  }, []);

  const updateMediaUrl = useCallback((index: number, value: string) => {
    setMediaUrls(prev => prev.map((url, i) => i === index ? value : url));
  }, []);

  const removeMediaUrl = useCallback((index: number) => {
    setMediaUrls(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateThumbnailUrl = useCallback((index: number, value: string) => {
    setThumbnailUrls(prev => prev.map((url, i) => i === index ? value : url));
  }, []);

  const removeThumbnailUrl = useCallback((index: number) => {
    setThumbnailUrls(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateAttachment = useCallback((index: number, value: string) => {
    setAttachments(prev => prev.map((url, i) => i === index ? value : url));
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Accent Color
  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
  }, []);

  const clearAccentColor = useCallback(() => {
    setAccentColorState("");
  }, []);

  // Clear all
  const clearAll = useCallback(() => {
    setActionRows([]);
    setMediaUrls([]);
    setThumbnailUrls([]);
    setAttachments([]);
    setAccentColorState("");
    toast.success("Cleared all components");
  }, []);

  // Export JSON
  const toJSON = useCallback(() => {
    return JSON.stringify({
      components: actionRows.map(row => ({
        type: 1,
        components: row.components
      })),
      media: mediaUrls.filter(Boolean),
      thumbnails: thumbnailUrls.filter(Boolean),
      attachments: attachments.filter(Boolean),
      accentColor: accentColor || undefined
    }, null, 2);
  }, [actionRows, mediaUrls, thumbnailUrls, attachments, accentColor]);

  const copyJSON = useCallback(() => {
    const json = toJSON();
    navigator.clipboard.writeText(json);
    toast.success("JSON copied to clipboard");
  }, [toJSON]);

  const addContainerComponent = useCallback((rowIndex: number, compIndex: number, innerType: string) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex || comp.type !== 17) return comp;
        const innerComps = [...(comp.components || [])];
        
        switch (innerType) {
          case 'button':
            if (innerComps.length >= 5) return comp;
            innerComps.push({
              type: 2,
              style: 1,
              label: "",
              custom_id: `btn_${Date.now()}`,
            });
            break;
          case 'textDisplay':
            innerComps.push({ type: 13, content: "" });
            break;
          case 'separator':
            innerComps.push({ type: 12, divider: true });
            break;
        }
        
        return { ...comp, components: innerComps };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const removeContainerComponent = useCallback((rowIndex: number, compIndex: number, innerIndex: number) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex || comp.type !== 17) return comp;
        return {
          ...comp,
          components: comp.components?.filter((_: any, k: number) => k !== innerIndex) || []
        };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const updateContainerComponent = useCallback((rowIndex: number, compIndex: number, innerIndex: number, key: string, value: any) => {
    setActionRows(prev => prev.map((row, i) => {
      if (i !== rowIndex) return row;
      const newComps = row.components.map((comp, j) => {
        if (j !== compIndex || comp.type !== 17) return comp;
        const innerComps = comp.components?.map((inner: any, k: number) => {
          if (k !== innerIndex) return inner;
          return { ...inner, [key]: value };
        }) || [];
        return { ...comp, components: innerComps };
      });
      return { ...row, components: newComps };
    }));
  }, []);

  const getComponentLabel = (type: number) => {
    switch (type) {
      case 2: return 'Button';
      case 3: return 'String Select';
      case 5: return 'User Select';
      case 6: return 'Role Select';
      case 8: return 'Channel Select';
      case 12: return 'Separator';
      case 13: return 'Text Display';
      case 14: return 'Section';
      case 17: return 'Container';
      default: return 'Component';
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Components v2 Builder</h2>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={addActionRow}>
            <Plus className="w-4 h-4 mr-2" />
            Add Action Row
          </Button>
          {actionRows.length > 0 && (
            <Button type="button" variant="destructive" size="icon" onClick={clearAll}>
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Action Rows */}
      {actionRows.map((row, rowIndex) => (
        <Card key={rowIndex} className="p-4 space-y-4 bg-muted/50">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Action Row {rowIndex + 1}</Label>
            <Button type="button" variant="ghost" size="sm" onClick={() => removeActionRow(rowIndex)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Add Component Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addActionRowComponents(rowIndex, 'button')}
              disabled={row.components.length >= 5 || (row.components.length > 0 && row.components[0]?.type !== 2)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Button
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addActionRowComponents(rowIndex, 'stringSelect')}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              String Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addActionRowComponents(rowIndex, 'userSelect')}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              User Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addActionRowComponents(rowIndex, 'roleSelect')}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Role Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addActionRowComponents(rowIndex, 'channelSelect')}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Channel Select
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addSeparator(rowIndex)}>
              <Minus className="w-4 h-4 mr-2" />
              Separator
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addTextDisplay(rowIndex)}>
              <Type className="w-4 h-4 mr-2" />
              Text Display
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => addActionRowComponents(rowIndex, 'container')}>
              <Plus className="w-4 h-4 mr-2" />
              Container
            </Button>
          </div>

          {/* Render Components */}
          <div className="space-y-3">
            {row.components.map((comp, compIndex) => (
              <Card key={compIndex} className="p-3 bg-background">
                <div className="flex justify-between items-start mb-3">
                  <Label className="font-semibold">{getComponentLabel(comp.type)}</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeComponent(rowIndex, compIndex)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Button Component */}
                {comp.type === 2 && (
                  <div className="space-y-3">
                    <div>
                      <Label>Style</Label>
                      <Select
                        value={String(comp.style || 1)}
                        onValueChange={(v) => updateComponent(rowIndex, compIndex, 'style', Number(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Primary (Blue)</SelectItem>
                          <SelectItem value="2">Secondary (Gray)</SelectItem>
                          <SelectItem value="3">Success (Green)</SelectItem>
                          <SelectItem value="4">Danger (Red)</SelectItem>
                          <SelectItem value="5">Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Label</Label>
                      <Input
                        value={comp.label || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'label', e.target.value)}
                        placeholder="Button text"
                      />
                    </div>
                    {comp.style === 5 ? (
                      <div>
                        <Label>URL</Label>
                        <Input
                          value={comp.url || ""}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'url', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    ) : (
                      <div>
                        <Label>Custom ID</Label>
                        <Input
                          value={comp.custom_id || ""}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'custom_id', e.target.value)}
                          placeholder="button_id"
                        />
                      </div>
                    )}
                    <div>
                      <Label>Emoji</Label>
                      <Input
                        value={comp.emoji?.name || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'emoji', e.target.value ? { name: e.target.value } : undefined)}
                        placeholder="😀"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={comp.disabled || false}
                        onCheckedChange={(checked) => updateComponent(rowIndex, compIndex, 'disabled', checked)}
                      />
                      <Label>Disabled</Label>
                    </div>
                  </div>
                )}

                {/* String Select Component */}
                {comp.type === 3 && (
                  <div className="space-y-3">
                    <div>
                      <Label>Custom ID</Label>
                      <Input
                        value={comp.custom_id || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'custom_id', e.target.value)}
                        placeholder="select_id"
                      />
                    </div>
                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        value={comp.placeholder || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'placeholder', e.target.value)}
                        placeholder="Choose an option..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Min Values</Label>
                        <Input
                          type="number"
                          value={comp.min_values || 1}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'min_values', Number(e.target.value))}
                          min="0"
                          max="25"
                        />
                      </div>
                      <div>
                        <Label>Max Values</Label>
                        <Input
                          type="number"
                          value={comp.max_values || 1}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'max_values', Number(e.target.value))}
                          min="1"
                          max="25"
                        />
                      </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Options</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addSelectOption(rowIndex, compIndex)}
                          disabled={(comp.options?.length || 0) >= 25}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                      {comp.options?.map((opt: any, optIndex: number) => (
                        <Card key={optIndex} className="p-2 bg-muted/30">
                          <div className="flex justify-between items-start mb-2">
                            <Label className="text-sm">Option {optIndex + 1}</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSelectOption(rowIndex, compIndex, optIndex)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input
                              value={opt.label || ""}
                              onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, 'label', e.target.value)}
                              placeholder="Option label"
                            />
                            <Input
                              value={opt.value || ""}
                              onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, 'value', e.target.value)}
                              placeholder="option_value"
                            />
                            <Input
                              value={opt.description || ""}
                              onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, 'description', e.target.value)}
                              placeholder="Description (optional)"
                            />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* User/Role/Channel Select Components */}
                {(comp.type === 5 || comp.type === 6 || comp.type === 8) && (
                  <div className="space-y-3">
                    <div>
                      <Label>Custom ID</Label>
                      <Input
                        value={comp.custom_id || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'custom_id', e.target.value)}
                        placeholder="select_id"
                      />
                    </div>
                    <div>
                      <Label>Placeholder</Label>
                      <Input
                        value={comp.placeholder || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'placeholder', e.target.value)}
                        placeholder={`Select a ${comp.type === 5 ? 'user' : comp.type === 6 ? 'role' : 'channel'}...`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Min Values</Label>
                        <Input
                          type="number"
                          value={comp.min_values || 1}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'min_values', Number(e.target.value))}
                          min="0"
                          max="25"
                        />
                      </div>
                      <div>
                        <Label>Max Values</Label>
                        <Input
                          type="number"
                          value={comp.max_values || 1}
                          onChange={(e) => updateComponent(rowIndex, compIndex, 'max_values', Number(e.target.value))}
                          min="1"
                          max="25"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Separator Component */}
                {comp.type === 12 && (
                  <div className="text-center text-muted-foreground py-2 border-t">
                    Separator divider
                  </div>
                )}

                {/* Text Display Component */}
                {comp.type === 13 && (
                  <div>
                    <Label>Content</Label>
                    <Input
                      value={comp.content || ""}
                      onChange={(e) => updateComponent(rowIndex, compIndex, 'content', e.target.value)}
                      placeholder="Display text..."
                    />
                  </div>
                )}

                {/* Container Component */}
                {comp.type === 17 && (
                  <div className="space-y-4">
                    <div>
                      <Label>Container Content (Text)</Label>
                      <Input
                        value={comp.content || ""}
                        onChange={(e) => updateComponent(rowIndex, compIndex, 'content', e.target.value)}
                        placeholder="Text content inside container..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Accent Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={comp.accent_color || "#5865F2"}
                            onChange={(e) => updateComponent(rowIndex, compIndex, 'accent_color', e.target.value)}
                            className="w-14 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            value={comp.accent_color || ""}
                            onChange={(e) => updateComponent(rowIndex, compIndex, 'accent_color', e.target.value)}
                            placeholder="#5865F2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <Checkbox
                          checked={comp.spoiler || false}
                          onCheckedChange={(checked) => updateComponent(rowIndex, compIndex, 'spoiler', checked)}
                        />
                        <Label>Spoiler</Label>
                      </div>
                    </div>

                    {/* Container Inner Components */}
                    <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                      <div className="flex items-center justify-between">
                        <Label className="font-semibold text-sm">Inner Components</Label>
                        <div className="flex gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addContainerComponent(rowIndex, compIndex, 'button')}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Button
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addContainerComponent(rowIndex, compIndex, 'textDisplay')}
                          >
                            <Type className="w-3 h-3 mr-1" />
                            Text
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addContainerComponent(rowIndex, compIndex, 'separator')}
                          >
                            <Minus className="w-3 h-3 mr-1" />
                            Sep
                          </Button>
                        </div>
                      </div>

                      {/* Render inner components */}
                      {comp.components?.map((inner: any, innerIdx: number) => (
                        <Card key={innerIdx} className="p-2 bg-muted/50">
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-xs font-medium">
                              {inner.type === 2 ? 'Button' : inner.type === 13 ? 'Text Display' : 'Separator'}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeContainerComponent(rowIndex, compIndex, innerIdx)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          {inner.type === 2 && (
                            <div className="space-y-2">
                              <Select
                                value={String(inner.style || 1)}
                                onValueChange={(v) => updateContainerComponent(rowIndex, compIndex, innerIdx, 'style', Number(v))}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">Primary</SelectItem>
                                  <SelectItem value="2">Secondary</SelectItem>
                                  <SelectItem value="3">Success</SelectItem>
                                  <SelectItem value="4">Danger</SelectItem>
                                  <SelectItem value="5">Link</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                value={inner.label || ""}
                                onChange={(e) => updateContainerComponent(rowIndex, compIndex, innerIdx, 'label', e.target.value)}
                                placeholder="Button label"
                                className="h-8 text-xs"
                              />
                            </div>
                          )}
                          
                          {inner.type === 13 && (
                            <Input
                              value={inner.content || ""}
                              onChange={(e) => updateContainerComponent(rowIndex, compIndex, innerIdx, 'content', e.target.value)}
                              placeholder="Text content..."
                              className="h-8 text-xs"
                            />
                          )}
                          
                          {inner.type === 12 && (
                            <div className="text-xs text-muted-foreground text-center py-1 border-t">
                              Divider
                            </div>
                          )}
                        </Card>
                      ))}

                      {(!comp.components || comp.components.length === 0) && (
                        <p className="text-xs text-muted-foreground">No inner components added</p>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>
      ))}

      {/* Media Gallery Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">Media Gallery</Label>
          <Button type="button" variant="outline" size="sm" onClick={addMediaGallery}>
            <Image className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
        <div className="space-y-2">
          {mediaUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateMediaUrl(idx, e.target.value)}
                placeholder="Image URL"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => removeMediaUrl(idx)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {mediaUrls.length === 0 && (
            <p className="text-sm text-muted-foreground">No images added yet</p>
          )}
        </div>
      </Card>

      {/* Thumbnails Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">Thumbnails</Label>
          <Button type="button" variant="outline" size="sm" onClick={addThumbnail}>
            <Image className="w-4 h-4 mr-2" />
            Add Thumbnail
          </Button>
        </div>
        <div className="space-y-2">
          {thumbnailUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateThumbnailUrl(idx, e.target.value)}
                placeholder="Thumbnail URL"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => removeThumbnailUrl(idx)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {thumbnailUrls.length === 0 && (
            <p className="text-sm text-muted-foreground">No thumbnails added yet</p>
          )}
        </div>
      </Card>

      {/* Attachments Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">File Attachments</Label>
          <Button type="button" variant="outline" size="sm" onClick={addFileComponents}>
            <FileIcon className="w-4 h-4 mr-2" />
            Add File
          </Button>
        </div>
        <div className="space-y-2">
          {attachments.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateAttachment(idx, e.target.value)}
                placeholder="File URL"
              />
              <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(idx)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {attachments.length === 0 && (
            <p className="text-sm text-muted-foreground">No files added yet</p>
          )}
        </div>
      </Card>

      {/* Accent Color Section */}
      <Card className="p-4 bg-muted/30">
        <div className="space-y-2">
          <Label>Accent Color (Optional)</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={accentColor || "#5865F2"}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-20 h-10 p-1 cursor-pointer"
            />
            <Input
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#5865F2"
              className="flex-1"
            />
            {accentColor && (
              <Button type="button" variant="outline" size="sm" onClick={clearAccentColor}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Export JSON */}
      <div className="flex justify-center">
        <Button type="button" variant="secondary" onClick={copyJSON}>
          <Copy className="w-4 h-4 mr-2" />
          Copy JSON
        </Button>
      </div>
    </Card>
  );
};

export default ComponentsBuilder;
