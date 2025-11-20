import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarPreview } from "@/components/AvatarPreview";
import { StyleSelector } from "@/components/StyleSelector";
import { AvatarGallery } from "@/components/AvatarGallery";
import { generateAvatar, AvatarStyle } from "@/lib/avatarGenerators";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [identifier, setIdentifier] = useState("user@example.com");
  const [style, setStyle] = useState<AvatarStyle>('geometric');
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const updateAvatar = async () => {
      if (identifier.trim()) {
        const svg = await generateAvatar(identifier, style);
        setSvgContent(svg);
      }
    };

    updateAvatar();
  }, [identifier, style]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SVGuid Avatar Generator
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Generate unique, deterministic avatars from any identifier
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="identifier" className="text-lg font-semibold">
                Enter Identifier
              </Label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="user@example.com"
                className="text-lg h-14 shadow-card"
              />
              <p className="text-sm text-muted-foreground">
                Each identifier generates a unique, consistent avatar. Try your email, username, or any text!
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Avatar Style</Label>
              <StyleSelector currentStyle={style} onStyleChange={setStyle} />
            </div>
          </div>

          {/* Avatar Preview */}
          {svgContent && (
            <div className="flex justify-center">
              <AvatarPreview svgContent={svgContent} identifier={identifier} />
            </div>
          )}

          {/* Gallery */}
          <div className="pt-8 border-t border-border">
            <AvatarGallery style={style} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Inspired by{" "}
            <a 
              href="https://github.com/mmamorim/svguid" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              svguid
            </a>
            {" "}• Built with React + TypeScript + Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
