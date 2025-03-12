import { languages } from '../i18n/ui';
import { getLocalizedURL } from '@/i18n/utils';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useEffect, useState } from "react"

export function LanguagePicker({ lang }: { lang: string }) {
  const [currentUrl, setCurrentUrl] = useState<URL | null>(null);
  
  // Use useEffect to access window only on the client side
  useEffect(() => {
    setCurrentUrl(new URL(window.location.href));
  }, []);
  
  // Handle language switching
  const handleLanguageSwitch = (targetLang: string) => {
    if (targetLang === lang || !currentUrl) return;
    
    // Use the utility function to get the localized URL
    const newPath = getLocalizedURL(currentUrl, targetLang as any);
    window.location.href = newPath;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, label]) => (
          <DropdownMenuItem
            key={code}
            className={lang === code ? 'bg-muted' : ''}
            onClick={() => handleLanguageSwitch(code)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
