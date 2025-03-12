import { languages } from '../i18n/ui';
import { useTranslations } from '@/i18n/utils';
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
  const [pathname, setPathname] = useState('/');
  
  // Use useEffect to access window only on the client side
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  
  // Handle language switching
  const handleLanguageSwitch = (targetLang: string) => {
    if (targetLang === lang) return;
    
    let newPathname = pathname;
    
    // Handle job detail pages
    if (pathname.includes('/jobs/')) {
      // For job detail pages, we need to preserve the job ID
      const jobId = pathname.split('/').pop();
      if (targetLang === 'en') {
        newPathname = `/en/jobs/${jobId}`;
      } else {
        newPathname = `/jobs/${jobId}`;
      }
    } else {
      // For other pages, use the standard language path logic
      if (targetLang === 'en') {
        newPathname = pathname.startsWith('/en') ? pathname : `/en${pathname}`;
      } else {
        newPathname = pathname.startsWith('/en') ? pathname.replace(/^\/en/, '') : pathname;
      }
    }
    
    window.location.href = newPathname;
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
        <DropdownMenuItem
          className={lang === 'es' ? 'bg-muted' : ''}
          onClick={() => handleLanguageSwitch('es')}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          className={lang === 'en' ? 'bg-muted' : ''}
          onClick={() => handleLanguageSwitch('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
