import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AvatarCardProps {
  svgContent: string;
  index?: number;
}

export const AvatarCard = ({ svgContent, index = 0 }: AvatarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="p-2 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden group">
        <div 
          className="w-full aspect-square rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-110"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </Card>
    </motion.div>
  );
};
