import { useEffect, useState } from "react";
import { generateAvatar, AvatarStyle } from "@/lib/avatarGenerators";
import { AvatarCard } from "./AvatarCard";

interface AvatarGalleryProps {
  style: AvatarStyle;
}

export const AvatarGallery = ({ style }: AvatarGalleryProps) => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateExamples = async () => {
      setLoading(true);
      const examples: string[] = [];
      const identifiers = [
        'alex@company.com', 
        'sarah.jones', 
        'michael.chen', 
        'emma.wilson',
        'david.kumar',
        'lisa.martinez',
        'john.taylor',
        'sophia.anderson'
      ];
      
      for (const id of identifiers) {
        const svg = await generateAvatar(id, style);
        examples.push(svg);
      }
      
      setAvatars(examples);
      setLoading(false);
    };

    generateExamples();
  }, [style]);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Professional Avatar Examples
      </h3>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avatars.map((svg, index) => (
            <AvatarCard key={index} svgContent={svg} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
