#!/usr/bin/env node

/**
 * Fix CSV Script
 * 
 * This script fixes the CSV file exported by the translation helper script.
 * It removes the extra column at the end of each line and fixes duplicate values.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(process.cwd(), 'translations.csv');

try {
  // Read the CSV file
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  
  // Split by lines
  const lines = csvContent.split('\n');
  
  // Get the header
  const header = lines[0].trim();
  const fixedHeader = header.endsWith(',') ? header.substring(0, header.length - 1) : header;
  
  // Process the data lines
  const fixedLines = [fixedHeader];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Parse the line
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
        currentValue += char;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    // Add the last value
    if (currentValue) {
      values.push(currentValue);
    }
    
    // Remove the last value if it's empty
    if (values.length > 0 && values[values.length - 1] === '') {
      values.pop();
    }
    
    // Check if we have duplicate values for the same language
    if (values.length > 3) {
      // Keep only the first value for each language
      const key = values[0];
      const en = values[1];
      const es = values[2];
      
      // Create a new line with just the key and one value for each language
      const fixedLine = `${key},${en},${es}`;
      fixedLines.push(fixedLine);
    } else {
      // Line is already correct
      fixedLines.push(values.join(','));
    }
  }
  
  // Join the lines back together
  const fixedContent = fixedLines.join('\n');
  
  // Write the fixed content back to the file
  fs.writeFileSync(csvFilePath, fixedContent, 'utf8');
  
  console.log(`\nFixed CSV file at ${csvFilePath}`);
} catch (error) {
  console.error('Error fixing CSV file:', error);
  process.exit(1);
} 