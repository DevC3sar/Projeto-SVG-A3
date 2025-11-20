import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarPreview } from "@/components/AvatarPreview";
import { StyleSelector } from "@/components/StyleSelector";
import { AvatarGallery } from "@/components/AvatarGallery";
import { generateAvatar, AvatarStyle } from "@/lib/avatarGenerators";
import { Sparkles, Github } from "lucide-react";
import InteractiveBackground from "@/components/InteractiveBackground";

const Index = () => {
  const [identifier, setIdentifier] = useState("user@example.com");
  const [style, setStyle] = useState<AvatarStyle>('geometric');
  const [svgContent, setSvgContent] = useState("");
  const [variant, setVariant] = useState(0);
  const [lastGeneratedVariant, setLastGeneratedVariant] = useState<number | null>(null);

  useEffect(() => {
    const updateAvatar = async () => {
      if (identifier.trim()) {
        const svg = await generateAvatar(identifier, style, variant);
        setSvgContent(svg);
        setLastGeneratedVariant(variant);
      }
    };

    updateAvatar();
  }, [identifier, style, variant]);

  return (
    <div className="relative min-h-screen bg-gradient-subtle overflow-hidden">
      <InteractiveBackground />
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center">
                {/* Logo - stroke only */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="#000" strokeWidth="1.6" fill="none" />
                  <circle cx="12" cy="9" r="3" stroke="#000" strokeWidth="1.4" fill="none" />
                  <path d="M6 18c2-3 10-3 12 0" stroke="#000" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-black">
                Projeto A3 - Gerador Avatar SVG
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/DevC3sar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0f172a]/70 hover:bg-[#0f172a]/90 text-white px-3 py-2 rounded-md shadow-md"
                aria-label="GitHub - DevC3sar"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">Ver no GitHub</span>
              </a>

              <span className="text-xs text-muted-foreground">Feito por Guilherme Cesar</span>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-2">
            Gere avatares únicos e determinísticos a partir de qualquer identificador
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
                Insira o identificador
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
                Cada identificador gera um avatar único e consistente. Experimente seu e-mail, nome de usuário ou qualquer texto!
              </p>
            </div>

            {/* Style Selector */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Estilo do Avatar</Label>
              <StyleSelector currentStyle={style} onStyleChange={setStyle} />
            </div>
          </div>

          {/* Avatar Preview */}
          {svgContent && (
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                    <AvatarPreview svgContent={svgContent} identifier={identifier} />
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded-md shadow-md font-medium"
                        onClick={async () => {
                          const { generateUniqueAvatar } = await import('@/lib/avatarGenerators');
                          const res = await generateUniqueAvatar(identifier, style, 200);
                          setSvgContent(res.svg);
                          setVariant(res.variant);
                          setLastGeneratedVariant(res.variant);
                        }}
                      >
                        Gerar novo
                      </button>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <label className="font-medium">Variante</label>
                        <input type="number" value={variant} onChange={(e) => setVariant(Number(e.target.value))} className="w-20 input" />
                        {lastGeneratedVariant !== null && (
                          <span className="text-xs text-muted-foreground">Última gerada: {lastGeneratedVariant}</span>
                        )}
                      </div>
                    </div>
                  </div>
            </div>
          )}

          {/* Gallery */}
          <div className="pt-8 border-t border-border">
            <AvatarGallery style={style} />
          </div>
        </div>
      </main>

  {/* Removed footer: signature moved to header */}
    </div>
  );
};

export default Index;
