import { languages } from '../i18n/ui';
import { useTranslations } from '@/i18n/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguagePicker({ lang }: { lang: string }) {
  const t = useTranslations(lang as 'es' | 'en');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {t('language')}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
          <DropdownMenuItem>
            <a href="/">Español</a>
          </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/en/">English</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
