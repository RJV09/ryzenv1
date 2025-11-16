import { Card } from "@/components/ui/card";

interface MessagePreviewProps {
  embed: any;
  components: any[];
}

const MessagePreview = ({ embed, components }: MessagePreviewProps) => {
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
                <span className="text-white text-sm font-semibold">{embed.author.name}</span>
              </div>
            )}

            {embed.title && (
              <div className="text-[#00AFF4] font-semibold text-base hover:underline cursor-pointer">
                {embed.title}
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

            {embed.footer && (
              <div className="flex items-center gap-2 mt-2 text-xs text-[#949BA4]">
                {embed.footer.icon_url && (
                  <img src={embed.footer.icon_url} alt="" className="w-5 h-5 rounded-full" />
                )}
                <span>{embed.footer.text}</span>
              </div>
            )}
          </div>
        )}

        {components && components.length > 0 && (
          <div className="space-y-2">
            {components.map((row: any, rowIndex: number) => (
              <div key={rowIndex} className="flex flex-wrap gap-2">
                {row.components.map((comp: any, compIndex: number) => {
                  if (comp.type === 2) {
                    return (
                      <button
                        key={compIndex}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${getButtonStyle(comp.style)}`}
                        disabled
                      >
                        {comp.label || "Button"}
                      </button>
                    );
                  } else if (comp.type === 3 || comp.type === 5 || comp.type === 6 || comp.type === 7 || comp.type === 8) {
                    return (
                      <div key={compIndex} className="w-full bg-[#1e1f22] rounded px-3 py-2">
                        <div className="text-[#949BA4] text-sm">
                          {comp.placeholder || "Select an option"}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        )}

        {!embed && (!components || components.length === 0) && (
          <div className="text-[#949BA4] text-center py-8">
            No preview available. Create an embed or add components to see a preview.
          </div>
        )}
      </div>
    </Card>
  );
};

export default MessagePreview;
