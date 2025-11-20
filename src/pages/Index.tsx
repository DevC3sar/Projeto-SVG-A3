import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarPreview } from "@/components/AvatarPreview";
import { StyleSelector } from "@/components/StyleSelector";
import { AvatarGallery } from "@/components/AvatarGallery";
import { generateAvatar, AvatarStyle } from "@/lib/avatarGenerators";
import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const [identifier, setIdentifier] = useState("alex@company.com");
  const [style, setStyle] = useState<AvatarStyle>('face');
  const [svgContent, setSvgContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const updateAvatar = async () => {
      setIsGenerating(true);
      if (identifier.trim()) {
        const svg = await generateAvatar(identifier, style);
        setSvgContent(svg);
      }
      setTimeout(() => setIsGenerating(false), 300);
    };

    updateAvatar();
  }, [identifier, style]);

  const generateRandomIdentifier = () => {
    const names = [
      'alex.smith', 'sarah.jones', 'michael.chen', 'emma.wilson',
      'david.kumar', 'lisa.martinez', 'john.taylor', 'sophia.anderson'
    ];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    setIdentifier(`${randomName}${randomNum}@company.com`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Professional Avatar Generator
            </h1>
          </motion.div>
          <motion.p 
            className="text-center text-muted-foreground mt-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create unique, professional cartoon avatars instantly
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Input Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <Label htmlFor="identifier" className="text-xl font-semibold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Enter Your Identifier
              </Label>
              <div className="flex gap-3">
                <Input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="alex@company.com"
                  className="text-lg h-16 shadow-card text-foreground font-medium border-2 focus:border-primary transition-all"
                />
                <Button
                  onClick={generateRandomIdentifier}
                  variant="outline"
                  size="lg"
                  className="h-16 px-6 shadow-card hover:shadow-glow transition-all"
                  title="Generate random identifier"
                >
                  <Sparkles className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                💡 Each identifier creates a unique avatar that stays consistent. Perfect for users, profiles, and team members!
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-4">
              <Label className="text-xl font-semibold">Choose Avatar Style</Label>
              <StyleSelector currentStyle={style} onStyleChange={setStyle} />
            </div>
          </motion.div>

          {/* Avatar Preview */}
          {svgContent && !isGenerating && (
            <div className="flex justify-center pt-4">
              <AvatarPreview svgContent={svgContent} identifier={identifier} />
            </div>
          )}
          
          {isGenerating && (
            <div className="flex justify-center pt-4">
              <div className="w-72 h-72 rounded-3xl bg-muted animate-pulse" />
            </div>
          )}

          {/* Gallery */}
          <div className="pt-8 border-t border-border">
            <AvatarGallery style={style} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/80 backdrop-blur-md mt-20">
        <div className="container mx-auto px-4 py-10">
          <p className="text-center text-muted-foreground">
            Inspired by{" "}
            <a 
              href="https://github.com/mmamorim/svguid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              svguid
            </a>
            {" "}• Built with React + TypeScript + Framer Motion
          </p>
          <p className="text-center text-muted-foreground/70 text-sm mt-2">
            Professional cartoon avatars for modern applications
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
