import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy, Code2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-8 shadow-card bg-gradient-subtle border-2 border-border/50">
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div 
              className="w-72 h-72 rounded-3xl overflow-hidden shadow-glow border-4 border-primary/20 bg-card"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity pointer-events-none" />
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={handleDownload}
              size="lg"
              className="gap-2 shadow-card hover:shadow-glow transition-all"
            >
              <Download className="w-4 h-4" />
              Download SVG
            </Button>
            
            <Button 
              onClick={handleCopyCode}
              variant="secondary"
              size="lg"
              className="gap-2 shadow-card hover:shadow-glow transition-all"
            >
              <Code2 className="w-4 h-4" />
              Copy Code
            </Button>
            
            <Button 
              onClick={handleCopyDataURL}
              variant="outline"
              size="lg"
              className="gap-2 shadow-card hover:shadow-glow transition-all"
            >
              <Copy className="w-4 h-4" />
              Copy Data URL
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
