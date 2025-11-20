import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Code2 } from "lucide-react";
import { toast } from "sonner";

interface AvatarPreviewProps {
  svgContent: string;
  identifier: string;
}

export const AvatarPreview = ({ svgContent, identifier }: AvatarPreviewProps) => {
  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `avatar-${identifier}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Avatar downloaded!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(svgContent);
    toast.success('SVG code copied to clipboard!');
  };

  const handleCopyDataURL = () => {
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
    navigator.clipboard.writeText(dataUrl);
    toast.success('Data URL copied to clipboard!');
  };

  return (
    <Card className="p-8 shadow-card">
      <div className="flex flex-col items-center gap-6">
        <div 
          className="w-64 h-64 rounded-2xl overflow-hidden shadow-glow border-2 border-border"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
        
        <div className="flex gap-3">
          <Button 
            onClick={handleDownload}
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          
          <Button 
            onClick={handleCopyCode}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <Code2 className="w-4 h-4" />
            Copy SVG
          </Button>
          
          <Button 
            onClick={handleCopyDataURL}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy URL
          </Button>
        </div>
      </div>
    </Card>
  );
};
