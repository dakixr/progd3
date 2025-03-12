#!/usr/bin/env node

/**
 * Translation Helper Script
 * 
 * This script provides utilities for managing translations in the programita d3 job portal.
 * It helps identify missing translations and add new ones.
 * 
 * Usage:
 *   node translation-helper.js check   - Check for missing translations
 *   node translation-helper.js add     - Add a new translation key
 *   node translation-helper.js export  - Export translations to CSV
 *   node translation-helper.js import  - Import translations from CSV
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const i18nFilePath = path.join(__dirname, '../i18n/ui.ts');

// Helper function to read the translations file
function readTranslationsFile() {
  try {
    const fileContent = fs.readFileSync(i18nFilePath, 'utf8');
    
    // Extract the languages
    const languagesMatch = fileContent.match(/export const languages = {([^}]+)}/);
    if (!languagesMatch) {
      console.error('Could not parse languages from file');
      process.exit(1);
    }
    
    // Parse languages
    const languagesStr = languagesMatch[1].trim();
    const languages = {};
    languagesStr.split(',').forEach(lang => {
      const [key, value] = lang.split(':').map(s => s.trim().replace(/['"]/g, ''));
      languages[key] = value;
    });
    
    // Extract the translations
    const translations = {};
    
    // Initialize translations object with empty objects for each language
    Object.keys(languages).forEach(lang => {
      translations[lang] = {};
    });
    
    // Extract the ui object
    const uiMatch = fileContent.match(/export const ui = ({[\s\S]*?}) as const;/);
    if (!uiMatch) {
      console.error('Could not parse UI translations from file');
      process.exit(1);
    }
    
    // Simple approach: manually parse the translations
    const uiContent = uiMatch[1];
    
    // For each language, extract its section
    Object.keys(languages).forEach(lang => {
      // Find the start of the language section
      const langStart = uiContent.indexOf(`${lang}: {`);
      if (langStart === -1) return;
      
      // Find the end of the language section
      let braceCount = 1;
      let langEnd = langStart + lang.length + 3; // Skip "lang: {"
      
      while (braceCount > 0 && langEnd < uiContent.length) {
        if (uiContent[langEnd] === '{') braceCount++;
        if (uiContent[langEnd] === '}') braceCount--;
        langEnd++;
      }
      
      // Extract the language section
      const langSection = uiContent.substring(langStart + lang.length + 3, langEnd - 1).trim();
      
      // Split by lines and extract key-value pairs
      const lines = langSection.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('//')) continue;
        
        // Extract key and value
        const match = trimmedLine.match(/['"]([^'"]+)['"]\s*:\s*['"]([^'"]+)['"](,)?/);
        if (match) {
          const key = match[1];
          const value = match[2];
          translations[lang][key] = value;
        }
      }
    });
    
    return { languages, translations };
  } catch (error) {
    console.error('Error reading translations file:', error);
    process.exit(1);
  }
}

// Helper function to write translations back to the file
function writeTranslationsFile(languages, translations) {
  try {
    let content = 'export const languages = {\n';
    
    // Add languages
    Object.entries(languages).forEach(([key, value], i, arr) => {
      content += `  ${key}: '${value}'${i < arr.length - 1 ? ',' : ''}\n`;
    });
    
    content += '};\n\n';
    
    // Add defaultLang
    content += 'export const defaultLang = "es";\n\n';
    
    // Add translations
    content += 'export const ui = {\n';
    
    // Add each language section
    Object.keys(languages).forEach((lang, index) => {
      content += `  ${lang}: {\n`;
      
      // Add key-value pairs
      Object.entries(translations[lang]).forEach(([key, value], i, arr) => {
        content += `    '${key}': "${value}"${i < arr.length - 1 ? ',' : ''}\n`;
      });
      
      content += `  }${index < Object.keys(languages).length - 1 ? ',' : ''}\n`;
    });
    
    content += '} as const;\n';
    
    fs.writeFileSync(i18nFilePath, content, 'utf8');
    console.log('Translations file updated successfully');
  } catch (error) {
    console.error('Error writing translations file:', error);
    process.exit(1);
  }
}

// Function to check for missing translations
function checkTranslations() {
  const { languages, translations } = readTranslationsFile();
  
  console.log('\nChecking for missing translations...');
  
  // Get all keys from all languages
  const allKeys = new Set();
  Object.values(translations).forEach(langTranslations => {
    Object.keys(langTranslations).forEach(key => allKeys.add(key));
  });
  
  // Check for missing keys in each language
  let hasMissingTranslations = false;
  
  Object.keys(languages).forEach(lang => {
    const missingKeys = [];
    
    allKeys.forEach(key => {
      if (!translations[lang][key]) {
        missingKeys.push(key);
      }
    });
    
    if (missingKeys.length > 0) {
      hasMissingTranslations = true;
      console.log(`\nMissing translations for ${languages[lang]} (${lang}):`);
      missingKeys.forEach(key => {
        console.log(`  - ${key}`);
        
        // Show translations in other languages for reference
        Object.keys(languages).forEach(otherLang => {
          if (otherLang !== lang && translations[otherLang][key]) {
            console.log(`    ${languages[otherLang]}: ${translations[otherLang][key]}`);
          }
        });
      });
    }
  });
  
  if (!hasMissingTranslations) {
    console.log('\nAll translations are complete!');
  }
  
  rl.close();
}

// Function to add a new translation
function addTranslation() {
  const { languages, translations } = readTranslationsFile();
  
  console.log('\nAdding a new translation:');
  
  rl.question('Enter the translation key: ', (key) => {
    if (!key.trim()) {
      console.error('Translation key cannot be empty');
      rl.close();
      return;
    }
    
    // Check if key already exists
    const existingLanguages = [];
    Object.keys(languages).forEach(lang => {
      if (translations[lang][key]) {
        existingLanguages.push(lang);
      }
    });
    
    if (existingLanguages.length > 0) {
      console.log(`\nWarning: Key "${key}" already exists in the following languages:`);
      existingLanguages.forEach(lang => {
        console.log(`  - ${languages[lang]} (${lang}): ${translations[lang][key]}`);
      });
      
      rl.question('Do you want to overwrite these translations? (y/n): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log('Operation cancelled');
          rl.close();
          return;
        }
        
        addTranslationValues(key, languages, translations);
      });
    } else {
      addTranslationValues(key, languages, translations);
    }
  });
}

// Helper function to add translation values for each language
function addTranslationValues(key, languages, translations) {
  const languageKeys = Object.keys(languages);
  let currentLangIndex = 0;
  
  function askForNextLanguage() {
    if (currentLangIndex >= languageKeys.length) {
      writeTranslationsFile(languages, translations);
      console.log('\nTranslation added successfully!');
      rl.close();
      return;
    }
    
    const lang = languageKeys[currentLangIndex];
    const langName = languages[lang];
    
    rl.question(`Enter the ${langName} (${lang}) translation: `, (value) => {
      if (!value.trim()) {
        console.error(`Translation for ${langName} cannot be empty`);
        return askForNextLanguage();
      }
      
      translations[lang][key] = value;
      currentLangIndex++;
      askForNextLanguage();
    });
  }
  
  askForNextLanguage();
}

// Function to export translations to CSV
function exportTranslations() {
  const { languages, translations } = readTranslationsFile();
  
  console.log('\nExporting translations to CSV...');
  
  // Get all keys from all languages
  const allKeys = new Set();
  Object.values(translations).forEach(langTranslations => {
    Object.keys(langTranslations).forEach(key => allKeys.add(key));
  });
  
  // Create CSV content
  let csvContent = 'key';
  const languageKeys = Object.keys(languages);
  languageKeys.forEach(lang => {
    csvContent += `,${lang}`;
  });
  csvContent += '\n';
  
  // Add rows for each key
  Array.from(allKeys).sort().forEach(key => {
    csvContent += `"${key}"`;
    
    languageKeys.forEach(lang => {
      const value = translations[lang][key] || '';
      csvContent += `,"${value.replace(/"/g, '""')}"`;
    });
    
    csvContent += '\n';
  });
  
  // Write to file
  const csvFilePath = path.join(process.cwd(), 'translations.csv');
  fs.writeFileSync(csvFilePath, csvContent, 'utf8');
  
  console.log(`\nTranslations exported to ${csvFilePath}`);
  rl.close();
}

// Function to import translations from CSV
function importTranslations() {
  console.log('\nImporting translations from CSV...');
  
  const csvFilePath = path.join(process.cwd(), 'translations.csv');
  
  if (!fs.existsSync(csvFilePath)) {
    console.error(`CSV file not found at ${csvFilePath}`);
    rl.close();
    return;
  }
  
  try {
    const { languages, translations: existingTranslations } = readTranslationsFile();
    const csvContent = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvContent.split('\n');
    
    if (lines.length < 2) {
      console.error('CSV file is empty or invalid');
      rl.close();
      return;
    }
    
    // Parse header to get language codes
    const header = lines[0].split(',');
    if (header.length < 2 || header[0] !== 'key') {
      console.error('CSV file has invalid header format');
      rl.close();
      return;
    }
    
    const csvLanguages = header.slice(1);
    
    // Validate languages
    csvLanguages.forEach(lang => {
      if (!languages[lang]) {
        console.error(`Unknown language code in CSV: ${lang}`);
        rl.close();
        process.exit(1);
      }
    });
    
    // Parse rows
    const translations = { ...existingTranslations };
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Split by comma, but respect quotes
      const values = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue);
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      values.push(currentValue);
      
      if (values.length < header.length) {
        console.error(`Line ${i + 1} has fewer columns than expected`);
        continue;
      }
      
      const key = values[0].replace(/^"|"$/g, '');
      
      csvLanguages.forEach((lang, index) => {
        const value = values[index + 1].replace(/^"|"$/g, '').replace(/""/g, '"');
        if (value) {
          translations[lang][key] = value;
        }
      });
    }
    
    writeTranslationsFile(languages, translations);
    console.log('\nTranslations imported successfully!');
  } catch (error) {
    console.error('Error importing translations:', error);
  }
  
  rl.close();
}

// Main function
function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('Usage:');
    console.log('  node translation-helper.js check   - Check for missing translations');
    console.log('  node translation-helper.js add     - Add a new translation key');
    console.log('  node translation-helper.js export  - Export translations to CSV');
    console.log('  node translation-helper.js import  - Import translations from CSV');
    rl.close();
    return;
  }
  
  switch (command.toLowerCase()) {
    case 'check':
      checkTranslations();
      break;
    case 'add':
      addTranslation();
      break;
    case 'export':
      exportTranslations();
      break;
    case 'import':
      importTranslations();
      break;
    default:
      console.error('Unknown command:', command);
      rl.close();
  }
}

main(); 