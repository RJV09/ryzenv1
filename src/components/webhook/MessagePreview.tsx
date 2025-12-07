import { Card } from "@/components/ui/card";

interface MessagePreviewProps {
  content?: string;
  embed: any;
  components: any[];
  galleryEmbeds?: any[];
}

const MessagePreview = ({ content, embed, components, galleryEmbeds = [] }: MessagePreviewProps) => {
  const getButtonStyle = (style: number) => {
    switch (style) {
      case 1: return "bg-[#5865F2] hover:bg-[#4752C4] text-white";
      case 2: return "bg-[#4E5058] hover:bg-[#5D5F66] text-white";
      case 3: return "bg-[#248046] hover:bg-[#1A6334] text-white";
      case 4: return "bg-[#DA373C] hover:bg-[#A12828] text-white";
      case 5: return "bg-transparent hover:bg-[#5865F2]/10 text-[#00AFF4] border border-[#00AFF4]";
      default: return "bg-[#5865F2] hover:bg-[#4752C4] text-white";
    }
  };

  const getSelectTypeName = (type: number) => {
    switch (type) {
      case 3: return "String Select";
      case 5: return "User Select";
      case 6: return "Role Select";
      case 8: return "Channel Select";
      default: return "Select Menu";
    }
  };

  return (
    <Card className="p-6 bg-[#313338] border-[#1e1f22]">
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-semibold">
            W
          </div>
          <div>
            <div className="text-white font-semibold">Webhook</div>
            <div className="text-[#949BA4] text-xs">Today at {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
          </div>
        </div>

        {content && (
          <div className="text-[#DBDEE1] mb-4 whitespace-pre-wrap">
            {content}
          </div>
        )}

        {embed && (
          <div 
            className="border-l-4 rounded bg-[#2B2D31] p-4 space-y-2"
            style={{ borderColor: embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#5865F2' }}
          >
            {embed.author && (
              <div className="flex items-center gap-2 mb-2">
                {embed.author.icon_url && (
                  <img src={embed.author.icon_url} alt="" className="w-6 h-6 rounded-full" />
                )}
                {embed.author.url ? (
                  <a href={embed.author.url} target="_blank" rel="noopener noreferrer" className="text-white text-sm font-semibold hover:underline">
                    {embed.author.name}
                  </a>
                ) : (
                  <span className="text-white text-sm font-semibold">{embed.author.name}</span>
                )}
              </div>
            )}

            {embed.title && (
              <div className="text-[#00AFF4] font-semibold text-base hover:underline cursor-pointer">
                {embed.url ? (
                  <a href={embed.url} target="_blank" rel="noopener noreferrer">{embed.title}</a>
                ) : (
                  embed.title
                )}
              </div>
            )}

            {embed.description && (
              <div className="text-[#DBDEE1] text-sm whitespace-pre-wrap">
                {embed.description}
              </div>
            )}

            {embed.fields && embed.fields.length > 0 && (
              <div className="grid gap-2 mt-2" style={{ 
                gridTemplateColumns: embed.fields.some((f: any) => f.inline) ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr' 
              }}>
                {embed.fields.map((field: any, index: number) => (
                  <div key={index} className={field.inline ? "" : "col-span-full"}>
                    <div className="text-white text-sm font-semibold">{field.name}</div>
                    <div className="text-[#DBDEE1] text-sm">{field.value}</div>
                  </div>
                ))}
              </div>
            )}

            {embed.image && (
              <img 
                src={embed.image.url} 
                alt="" 
                className="rounded mt-4 max-w-full"
                style={{ maxHeight: '400px' }}
              />
            )}

            {embed.thumbnail && (
              <img 
                src={embed.thumbnail.url} 
                alt="" 
                className="rounded float-right ml-4 max-w-[80px]"
              />
            )}

            {(embed.footer || embed.timestamp) && (
              <div className="flex items-center gap-2 mt-2 text-xs text-[#949BA4]">
                {embed.footer?.icon_url && (
                  <img src={embed.footer.icon_url} alt="" className="w-5 h-5 rounded-full" />
                )}
                {embed.footer?.text && <span>{embed.footer.text}</span>}
                {embed.footer?.text && embed.timestamp && <span>•</span>}
                {embed.timestamp && (
                  <span>{new Date(embed.timestamp).toLocaleString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })}</span>
                )}
              </div>
            )}
          </div>
        )}
        {galleryEmbeds && galleryEmbeds.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {galleryEmbeds.map((g: any, idx: number) => (
              g?.image?.url ? (
                <img key={idx} src={g.image.url} alt="" className="rounded max-w-full" style={{ maxHeight: '200px' }} />
              ) : g?.thumbnail?.url ? (
                <img key={idx} src={g.thumbnail.url} alt="" className="rounded max-w-full" style={{ maxHeight: '120px' }} />
              ) : null
            ))}
          </div>
        )}

        {components && components.length > 0 && (
          <div className="space-y-2">
            {components.map((row: any, rowIndex: number) => (
              <div key={rowIndex} className="flex flex-col gap-2">
                {row.components?.map((comp: any, compIndex: number) => {
                  if (comp.type === 2) {
                    return (
                      <button
                        key={compIndex}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors inline-flex items-center justify-center ${getButtonStyle(comp.style)}`}
                        disabled={comp.disabled}
                      >
                        {comp.emoji?.name && <span className="mr-2">{comp.emoji.name}</span>}
                        {comp.label || "Button"}
                      </button>
                    );
                  } else if (comp.type === 3 || comp.type === 5 || comp.type === 6 || comp.type === 8) {
                    return (
                      <div key={compIndex} className="w-full bg-[#1e1f22] rounded px-4 py-2.5 text-[#DBDEE1] text-sm flex items-center justify-between">
                        <span className="text-[#949BA4]">{comp.placeholder || getSelectTypeName(comp.type)}</span>
                        <svg className="w-4 h-4 text-[#949BA4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    );
                  } else if (comp.type === 12) {
                    return (
                      <div key={compIndex} className="w-full border-t border-[#4E5058] my-2" />
                    );
                  } else if (comp.type === 13) {
                    return (
                      <div key={compIndex} className="text-[#DBDEE1] text-sm py-1">
                        {comp.content || "Text display"}
                      </div>
                    );
                  } else if (comp.type === 17) {
                    // Container component
                    return (
                      <div 
                        key={compIndex} 
                        className="border-l-4 rounded bg-[#2B2D31] p-3 space-y-2"
                        style={{ borderColor: comp.accent_color || '#5865F2' }}
                      >
                        {comp.spoiler && (
                          <div className="text-xs text-[#949BA4] mb-1">⚠️ Spoiler</div>
                        )}
                        {comp.content && (
                          <div className="text-[#DBDEE1] text-sm whitespace-pre-wrap">
                            {comp.content}
                          </div>
                        )}
                        {comp.components?.map((inner: any, innerIdx: number) => {
                          if (inner.type === 2) {
                            return (
                              <button
                                key={innerIdx}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors inline-flex items-center justify-center ${getButtonStyle(inner.style)}`}
                                disabled={inner.disabled}
                              >
                                {inner.emoji?.name && <span className="mr-1">{inner.emoji.name}</span>}
                                {inner.label || "Button"}
                              </button>
                            );
                          } else if (inner.type === 13) {
                            return (
                              <div key={innerIdx} className="text-[#DBDEE1] text-sm">
                                {inner.content || "Text"}
                              </div>
                            );
                          } else if (inner.type === 12) {
                            return (
                              <div key={innerIdx} className="border-t border-[#4E5058] my-1" />
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        )}

        {!content && !embed && (!components || components.length === 0) && (
          <div className="text-[#949BA4] text-center py-8">
            No preview available. Add content, create an embed, or add components to see a preview.
          </div>
        )}
      </div>
    </Card>
  );
};

export default MessagePreview;
