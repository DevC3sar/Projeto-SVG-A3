import { useEffect, useState } from "react";
import { generateAvatar, AvatarStyle } from "@/lib/avatarGenerators";
import { Card } from "@/components/ui/card";

interface AvatarGalleryProps {
  style: AvatarStyle;
}

export const AvatarGallery = ({ style }: AvatarGalleryProps) => {
  const [avatars, setAvatars] = useState<string[]>([]);

  useEffect(() => {
    const generateExamples = async () => {
      const examples: string[] = [];
      const identifiers = ['user1', 'user2', 'user3', 'user4', 'demo', 'test', 'avatar', 'random'];
      
      for (const id of identifiers) {
        const svg = await generateAvatar(id, style);
        examples.push(svg);
      }
      
      setAvatars(examples);
    };

    generateExamples();
  }, [style]);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Example Avatars
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {avatars.map((svg, index) => (
          <Card 
            key={index} 
            className="p-2 shadow-card hover:shadow-glow transition-shadow"
          >
            <div 
              className="w-full aspect-square rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
