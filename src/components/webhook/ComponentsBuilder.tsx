import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X, FileIcon, Image, Type, Minus } from "lucide-react";

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

  useEffect(() => {
    const formattedRows = actionRows
      .filter(row => row.components.length > 0)
      .map(row => ({
        type: 1,
        components: row.components
      }));
    
    onComponentsChange(formattedRows);
  }, [actionRows, onComponentsChange]);

  useEffect(() => {
    const embeds = mediaUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ image: { url } }));
    onMediaChange?.(embeds);
  }, [mediaUrls, onMediaChange]);

  useEffect(() => {
    const embeds = thumbnailUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ thumbnail: { url } }));
    onThumbnailsChange?.(embeds);
  }, [thumbnailUrls, onThumbnailsChange]);

  useEffect(() => {
    onAttachmentsChange?.(attachments.map(u => u.trim()).filter(Boolean));
  }, [attachments, onAttachmentsChange]);

  // Action Row Methods
  const addActionRow = () => {
    setActionRows([...actionRows, { type: 1, components: [] }]);
  };

  const removeActionRow = (index: number) => {
    setActionRows(actionRows.filter((_, i) => i !== index));
  };

  const addActionRowComponents = (rowIndex: number, componentType: string) => {
    const newRows = [...actionRows];
    const row = newRows[rowIndex];

    switch (componentType) {
      case 'button':
        if (row.components.length >= 5) return;
        row.components.push({
          type: 2,
          style: 1,
          label: "",
          custom_id: `btn_${Date.now()}`,
        });
        break;
      case 'stringSelect':
        if (row.components.length > 0) return;
        row.components.push({
          type: 3,
          custom_id: `select_${Date.now()}`,
          placeholder: "Select an option",
          options: [],
          min_values: 1,
          max_values: 1,
        });
        break;
      case 'userSelect':
        if (row.components.length > 0) return;
        row.components.push({
          type: 5,
          custom_id: `user_${Date.now()}`,
          placeholder: "Select a user",
          min_values: 1,
          max_values: 1,
        });
        break;
      case 'roleSelect':
        if (row.components.length > 0) return;
        row.components.push({
          type: 6,
          custom_id: `role_${Date.now()}`,
          placeholder: "Select a role",
          min_values: 1,
          max_values: 1,
        });
        break;
      case 'channelSelect':
        if (row.components.length > 0) return;
        row.components.push({
          type: 8,
          custom_id: `channel_${Date.now()}`,
          placeholder: "Select a channel",
          min_values: 1,
          max_values: 1,
        });
        break;
    }
    
    setActionRows(newRows);
  };

  // Component Methods
  const addSeparator = (rowIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components.push({
      type: 12,
      divider: true,
    });
    setActionRows(newRows);
  };

  const addTextDisplay = (rowIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components.push({
      type: 13,
      content: "",
    });
    setActionRows(newRows);
  };

  const addFileComponents = () => {
    addToList(setAttachments);
  };

  const addMediaGallery = () => {
    addToList(setMediaUrls);
  };

  const addSectionComponents = (rowIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components.push({
      type: 14,
      label: "Section",
      components: [],
    });
    setActionRows(newRows);
  };

  const removeComponent = (rowIndex: number, compIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components = newRows[rowIndex].components.filter((_, i) => i !== compIndex);
    setActionRows(newRows);
  };

  const updateComponent = (rowIndex: number, compIndex: number, key: string, value: any) => {
    const newRows = [...actionRows];
    const component = newRows[rowIndex].components[compIndex];
    
    if (key === 'style' && component.type === 2) {
      if (value === 5) {
        delete component.custom_id;
        component.url = component.url || "";
      } else {
        delete component.url;
        component.custom_id = component.custom_id || `btn_${Date.now()}`;
      }
    }
    
    newRows[rowIndex].components[compIndex] = {
      ...component,
      [key]: value
    };
    setActionRows(newRows);
  };

  // ID Management
  const setId = (rowIndex: number, compIndex: number, id: string) => {
    updateComponent(rowIndex, compIndex, 'custom_id', id);
  };

  const clearId = (rowIndex: number, compIndex: number) => {
    const newRows = [...actionRows];
    delete newRows[rowIndex].components[compIndex].custom_id;
    setActionRows(newRows);
  };

  // Accent Color Management
  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  const clearAccentColor = () => {
    setAccentColorState("");
  };

  // Spoiler Management
  const setSpoiler = (rowIndex: number, compIndex: number, spoiler: boolean) => {
    updateComponent(rowIndex, compIndex, 'spoiler', spoiler);
  };

  // Array Manipulation
  const spliceComponents = (rowIndex: number, start: number, deleteCount: number, ...items: any[]) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components.splice(start, deleteCount, ...items);
    setActionRows(newRows);
  };

  // JSON Export
  const toJSON = () => {
    return JSON.stringify({
      components: actionRows.map(row => ({
        type: 1,
        components: row.components
      })),
      media: mediaUrls.filter(Boolean),
      thumbnails: thumbnailUrls.filter(Boolean),
      attachments: attachments.filter(Boolean),
      accentColor
    }, null, 2);
  };

  // Select Menu Methods
  const addSelectOption = (rowIndex: number, compIndex: number) => {
    const newRows = [...actionRows];
    const select = newRows[rowIndex].components[compIndex];
    if (!select.options) select.options = [];
    if (select.options.length >= 25) return;
    
    select.options.push({
      label: "",
      value: `opt_${Date.now()}`,
      description: "",
    });
    setActionRows(newRows);
  };

  const removeSelectOption = (rowIndex: number, compIndex: number, optIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components[compIndex].options = 
      newRows[rowIndex].components[compIndex].options.filter((_: any, i: number) => i !== optIndex);
    setActionRows(newRows);
  };

  const updateSelectOption = (rowIndex: number, compIndex: number, optIndex: number, key: string, value: any) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components[compIndex].options[optIndex] = {
      ...newRows[rowIndex].components[compIndex].options[optIndex],
      [key]: value
    };
    setActionRows(newRows);
  };

  // Helper functions for lists
  const addToList = (setter: (fn: (arr: string[]) => string[]) => void) => {
    setter(arr => [...arr, ""]);
  };

  const removeFromList = (setter: (fn: (arr: string[]) => string[]) => void, index: number) => {
    setter(arr => arr.filter((_, i) => i !== index));
  };

  const updateInList = (setter: (fn: (arr: string[]) => string[]) => void, index: number, value: string) => {
    setter(arr => {
      const next = [...arr];
      next[index] = value;
      return next;
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Components v2 Builder</h2>
        <Button
          type="button"
          variant="outline"
          onClick={addActionRow}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Action Row
        </Button>
      </div>

      {/* Action Rows */}
      {actionRows.map((row, rowIndex) => (
        <Card key={rowIndex} className="p-4 space-y-4 bg-muted/50">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Action Row {rowIndex + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeActionRow(rowIndex)}
            >
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
              disabled={row.components.length >= 5 || (row.components[0]?.type !== 2 && row.components.length > 0)}
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSeparator(rowIndex)}
            >
              <Minus className="w-4 h-4 mr-2" />
              Separator
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addTextDisplay(rowIndex)}
            >
              <Type className="w-4 h-4 mr-2" />
              Text Display
            </Button>
          </div>

          {/* Render Components */}
          <div className="space-y-3">
            {row.components.map((comp, compIndex) => (
              <Card key={compIndex} className="p-3 bg-background">
                <div className="flex justify-between items-start mb-3">
                  <Label className="font-semibold">
                    {comp.type === 2 ? 'Button' : 
                     comp.type === 3 ? 'String Select' :
                     comp.type === 5 ? 'User Select' :
                     comp.type === 6 ? 'Role Select' :
                     comp.type === 8 ? 'Channel Select' :
                     comp.type === 12 ? 'Separator' :
                     comp.type === 13 ? 'Text Display' :
                     `Component ${compIndex + 1}`}
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent(rowIndex, compIndex)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Button Component */}
                {comp.type === 2 && (
                  <div className="space-y-3">
                    <div>
                      <Label>Style</Label>
                      <Select
                        value={String(comp.style)}
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
                    Separator
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
              </Card>
            ))}
          </div>
        </Card>
      ))}

      {/* Media Gallery Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">Media Gallery</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMediaGallery}
          >
            <Image className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
        <div className="space-y-2">
          {mediaUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateInList(setMediaUrls, idx, e.target.value)}
                placeholder="Image URL"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromList(setMediaUrls, idx)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Thumbnails Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">Thumbnails</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addToList(setThumbnailUrls)}
          >
            <Image className="w-4 h-4 mr-2" />
            Add Thumbnail
          </Button>
        </div>
        <div className="space-y-2">
          {thumbnailUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateInList(setThumbnailUrls, idx, e.target.value)}
                placeholder="Thumbnail URL"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromList(setThumbnailUrls, idx)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Attachments Section */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">File Attachments</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFileComponents}
          >
            <FileIcon className="w-4 h-4 mr-2" />
            Add File
          </Button>
        </div>
        <div className="space-y-2">
          {attachments.map((url, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => updateInList(setAttachments, idx, e.target.value)}
                placeholder="File URL"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFromList(setAttachments, idx)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
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
              className="w-20"
            />
            <Input
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="#5865F2"
              className="flex-1"
            />
            {accentColor && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearAccentColor}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Export JSON */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            const json = toJSON();
            navigator.clipboard.writeText(json);
          }}
        >
          Copy JSON
        </Button>
      </div>
    </Card>
  );
};

export default ComponentsBuilder;
