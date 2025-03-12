import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

// Create URL for the given language
export function getLocalizedURL(url: URL, lang: keyof typeof ui) {
  const currentLang = getLangFromUrl(url);
  const pathname = url.pathname;
  
  // If we're already on the requested language, return the current URL
  if (currentLang === lang) return pathname;
  
  // Handle default language
  if (lang === defaultLang && !showDefaultLang) {
    // Remove language prefix if it exists
    return pathname.replace(/^\/[a-z]{2}\//, '/');
  }
  
  // Handle non-default language
  if (currentLang === defaultLang) {
    // Add language prefix
    return `/${lang}${pathname}`;
  } else {
    // Replace language prefix
    return pathname.replace(/^\/[a-z]{2}\//, `/${lang}/`);
  }
}

// Get path with correct language prefix
export function localizedPath(path: string, lang: keyof typeof ui) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // For default language, don't add prefix unless showDefaultLang is true
  if (lang === defaultLang && !showDefaultLang) {
    return `/${cleanPath}`;
  }
  
  return `/${lang}/${cleanPath}`;
}

// Get correct path for a specific page in the current language
export function getRelativeLocaleUrl(lang: keyof typeof ui, path: string) {
  return localizedPath(path, lang);
}