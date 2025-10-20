import React, { useState } from "react";
import { Copy, Eye, Code, Check } from "lucide-react";
import { useThemeClasses, Card, CardHeader, CardContent, Button, cn } from "../../../../design-system";

// ================================
// TIPOS
// ================================

interface ComponentShowcaseProps {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  className?: string;
}

// ================================
// COMPONENTE SHOWCASE
// ================================

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  title,
  description,
  component,
  code,
  className
}) => {
  const { get } = useThemeClasses();
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card className={cn("mb-8", className)}>
      <CardHeader 
        title={title} 
        subtitle={description}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Ver Exemplo' : 'Ver Código'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            onClick={handleCopy}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {!showCode ? (
          <div className={cn(
            "p-6 rounded-lg border-2 border-dashed min-h-[100px] flex items-center justify-center",
            get("border.secondary"),
            get("background.secondary")
          )}>
            {component}
          </div>
        ) : (
          <pre className={cn(
            "p-4 rounded-lg overflow-x-auto text-sm",
            get("background.secondary"),
            get("text.primary"),
            "border",
            get("border.primary")
          )}>
            <code>{code}</code>
          </pre>
        )}
      </CardContent>
    </Card>
  );
};

// ================================
// COMPONENTE SEÇÃO
// ================================

interface ComponentSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const ComponentSection: React.FC<ComponentSectionProps> = ({
  title,
  description,
  children,
  className
}) => {
  const { get } = useThemeClasses();

  return (
    <div className={cn("mb-12", className)}>
      <div className="mb-6">
        <h2 className={cn("text-2xl font-bold mb-2", get("text.primary"))}>
          {title}
        </h2>
        {description && (
          <p className={cn("text-base", get("text.secondary"))}>
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

// ================================
// EXPORTS
// ================================

export default ComponentShowcase;