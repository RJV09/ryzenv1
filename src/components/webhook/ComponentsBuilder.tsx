import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

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
  const [actionRows, setActionRows] = useState<Array<{ type: string; components: any[] }>>([]);
  
  // Media & Attachments state
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);

  useEffect(() => {
    const formattedRows = actionRows
      .filter(row => row.components.length > 0)
      .map(row => ({
        type: 1,
        components: row.components
      }));
    
    onComponentsChange(formattedRows);
  }, [actionRows, onComponentsChange]);

  // Emit media gallery embeds
  useEffect(() => {
    const embeds = mediaUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ image: { url } }));
    onMediaChange?.(embeds);
  }, [mediaUrls, onMediaChange]);

  // Emit thumbnail embeds
  useEffect(() => {
    const embeds = thumbnailUrls
      .map(u => u.trim())
      .filter(Boolean)
      .map(url => ({ thumbnail: { url } }));
    onThumbnailsChange?.(embeds);
  }, [thumbnailUrls, onThumbnailsChange]);

  // Emit attachments
  useEffect(() => {
    onAttachmentsChange?.(attachments.map(u => u.trim()).filter(Boolean));
  }, [attachments, onAttachmentsChange]);

  const addActionRow = () => {
    setActionRows([...actionRows, { type: "button", components: [] }]);
  };

  const removeActionRow = (index: number) => {
    setActionRows(actionRows.filter((_, i) => i !== index));
  };

  const addButton = (rowIndex: number) => {
    const newRows = [...actionRows];
    if (newRows[rowIndex].components.length >= 5) return;
    
    newRows[rowIndex].components.push({
      type: 2,
      style: 1,
      label: "",
      custom_id: `button_${Date.now()}`,
      url: undefined,
    });
    setActionRows(newRows);
  };

  const addSelectMenu = (rowIndex: number, selectType: number) => {
    const newRows = [...actionRows];
    if (newRows[rowIndex].components.length > 0) return;
    
    const baseComponent = {
      custom_id: `select_${Date.now()}`,
      placeholder: "Select an option",
      min_values: 1,
      max_values: 1,
    };

    if (selectType === 3) {
      newRows[rowIndex].components.push({
        type: 3,
        ...baseComponent,
        options: [],
      });
    } else {
      newRows[rowIndex].components.push({
        type: selectType,
        ...baseComponent,
      });
    }
    
    setActionRows(newRows);
  };

  const removeComponent = (rowIndex: number, compIndex: number) => {
    const newRows = [...actionRows];
    newRows[rowIndex].components = newRows[rowIndex].components.filter((_, i) => i !== compIndex);
    setActionRows(newRows);
  };

  const updateButton = (rowIndex: number, compIndex: number, key: string, value: any) => {
    const newRows = [...actionRows];
    const component = newRows[rowIndex].components[compIndex];
    
    // Handle style change for buttons
    if (key === 'style') {
      if (value === 5) {
        // Link button - remove custom_id, add url
        delete component.custom_id;
        component.url = component.url || "";
      } else {
        // Regular button - remove url, add custom_id
        delete component.url;
        component.custom_id = component.custom_id || `button_${Date.now()}`;
      }
    }
    
    newRows[rowIndex].components[compIndex] = {
      ...component,
      [key]: value
    };
    setActionRows(newRows);
  };

  const addSelectOption = (rowIndex: number, compIndex: number) => {
    const newRows = [...actionRows];
    const select = newRows[rowIndex].components[compIndex];
    if (!select.options) select.options = [];
    if (select.options.length >= 25) return;
    
    select.options.push({
      label: "",
      value: `option_${Date.now()}`,
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

  // Helper functions for media/thumbnail/attachment lists
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
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Components v2 Builder</h2>
        <Button
          type="button"
          variant="outline"
          onClick={addActionRow}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Container (Action Row)
        </Button>
      </div>

      {actionRows.map((row, rowIndex) => (
        <div key={rowIndex} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label>Container {rowIndex + 1} (Action Row)</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeActionRow(rowIndex)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addButton(rowIndex)}
              disabled={row.components.length >= 5 || (row.components[0]?.type !== 2 && row.components.length > 0)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Button
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSelectMenu(rowIndex, 3)}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              String Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSelectMenu(rowIndex, 5)}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              User Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSelectMenu(rowIndex, 6)}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Role Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSelectMenu(rowIndex, 7)}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Mentionable Select
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addSelectMenu(rowIndex, 8)}
              disabled={row.components.length > 0}
            >
              <Plus className="w-4 h-4 mr-2" />
              Channel Select
            </Button>
          </div>

          <div className="space-y-3">
            {row.components.map((comp, compIndex) => {
              const getComponentTypeName = (type: number) => {
                switch (type) {
                  case 2: return "Button";
                  case 3: return "String Select";
                  case 5: return "User Select";
                  case 6: return "Role Select";
                  case 7: return "Mentionable Select";
                  case 8: return "Channel Select";
                  default: return "Component";
                }
              };

              return (
                <div key={compIndex} className="border rounded p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>{getComponentTypeName(comp.type)} {compIndex + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComponent(rowIndex, compIndex)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {comp.type === 2 ? (
                    <>
                      <Input
                        placeholder="Label"
                        value={comp.label || ""}
                        onChange={(e) => updateButton(rowIndex, compIndex, "label", e.target.value)}
                      />
                      <Select
                        value={comp.style?.toString() || "1"}
                        onValueChange={(value) => updateButton(rowIndex, compIndex, "style", parseInt(value))}
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
                      {comp.style === 5 && (
                        <Input
                          placeholder="URL"
                          value={comp.url || ""}
                          onChange={(e) => updateButton(rowIndex, compIndex, "url", e.target.value)}
                        />
                      )}
                      <Input
                        placeholder="Emoji (optional)"
                        value={comp.emoji || ""}
                        onChange={(e) => updateButton(rowIndex, compIndex, "emoji", e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        placeholder="Placeholder"
                        value={comp.placeholder || ""}
                        onChange={(e) => updateButton(rowIndex, compIndex, "placeholder", e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Min Values</Label>
                          <Input
                            type="number"
                            min="1"
                            max="25"
                            value={comp.min_values || 1}
                            onChange={(e) => updateButton(rowIndex, compIndex, "min_values", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Max Values</Label>
                          <Input
                            type="number"
                            min="1"
                            max="25"
                            value={comp.max_values || 1}
                            onChange={(e) => updateButton(rowIndex, compIndex, "max_values", parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      {comp.type === 3 && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Options</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addSelectOption(rowIndex, compIndex)}
                              disabled={comp.options?.length >= 25}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Option
                            </Button>
                          </div>
                          {comp.options?.map((opt: any, optIndex: number) => (
                            <div key={optIndex} className="border rounded p-2 space-y-2">
                              <div className="flex justify-between">
                                <Label>Option {optIndex + 1}</Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSelectOption(rowIndex, compIndex, optIndex)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Label"
                                value={opt.label || ""}
                                onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, "label", e.target.value)}
                              />
                              <Input
                                placeholder="Value"
                                value={opt.value || ""}
                                onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, "value", e.target.value)}
                              />
                              <Input
                                placeholder="Description (optional)"
                                value={opt.description || ""}
                                onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, "description", e.target.value)}
                              />
                              <Input
                                placeholder="Emoji (optional)"
                                value={opt.emoji || ""}
                                onChange={(e) => updateSelectOption(rowIndex, compIndex, optIndex, "emoji", e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {comp.type === 8 && (
                        <div className="space-y-2">
                          <Label>Channel Types (comma-separated)</Label>
                          <Input
                            placeholder="0,2,5 (0=Text, 2=Voice, 5=Announcement)"
                            value={comp.channel_types?.join(',') || ""}
                            onChange={(e) => {
                              const types = e.target.value.split(',').map(t => parseInt(t.trim())).filter(t => !isNaN(t));
                              updateButton(rowIndex, compIndex, "channel_types", types);
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Media Gallery, Thumbnails & Attachments */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold">Media & Attachments</h3>

        {/* Media Gallery */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Media Gallery (Image URLs)</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => addToList(setMediaUrls)}>
              <Plus className="w-4 h-4 mr-2" /> Add Image
            </Button>
          </div>
          {mediaUrls.length === 0 && (
            <p className="text-sm text-muted-foreground">Add image URLs to create gallery embeds.</p>
          )}
          <div className="space-y-2">
            {mediaUrls.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="https://example.com/image.png"
                  value={url}
                  onChange={(e) => updateInList(setMediaUrls, idx, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromList(setMediaUrls, idx)}
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Thumbnails (Thumbnail URLs)</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => addToList(setThumbnailUrls)}>
              <Plus className="w-4 h-4 mr-2" /> Add Thumbnail
            </Button>
          </div>
          {thumbnailUrls.length === 0 && (
            <p className="text-sm text-muted-foreground">Add thumbnail URLs. Each will be sent as a small embed thumbnail.</p>
          )}
          <div className="space-y-2">
            {thumbnailUrls.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="https://example.com/thumb.png"
                  value={url}
                  onChange={(e) => updateInList(setThumbnailUrls, idx, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromList(setThumbnailUrls, idx)}
                  aria-label="Remove thumbnail"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Attachments (File URLs)</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => addToList(setAttachments)}>
              <Plus className="w-4 h-4 mr-2" /> Add Attachment
            </Button>
          </div>
          {attachments.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Discord webhooks require multipart for real file uploads. These URLs will be appended to the message content.
            </p>
          )}
          <div className="space-y-2">
            {attachments.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder="https://example.com/file.pdf"
                  value={url}
                  onChange={(e) => updateInList(setAttachments, idx, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromList(setAttachments, idx)}
                  aria-label="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </Card>
  );
};

export default ComponentsBuilder;
