import { AvatarStyle } from "@/lib/avatarGenerators";
import { Button } from "@/components/ui/button";
import { Circle, Square, Grid3x3, Smile, Sparkles } from "lucide-react";

interface StyleSelectorProps {
  currentStyle: AvatarStyle;
  onStyleChange: (style: AvatarStyle) => void;
}

const styles: { value: AvatarStyle; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'geometric', label: 'Geométrico', icon: Circle },
  { value: 'blob', label: 'Blob', icon: Square },
  { value: 'pixel', label: 'Pixel', icon: Grid3x3 },
  { value: 'face', label: 'Rosto', icon: Smile },
  { value: 'abstract', label: 'Abstrato', icon: Sparkles },
];

export const StyleSelector = ({ currentStyle, onStyleChange }: StyleSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {styles.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          onClick={() => onStyleChange(value)}
          variant={currentStyle === value ? "default" : "outline"}
          size="sm"
          className="gap-2"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};
