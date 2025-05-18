import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the .env file
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Parse environment variables
const envVars = envContent.split('\n').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

// Read the index.html file
const indexPath = path.join(__dirname, '..', 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf-8');

// Replace environment variables
Object.entries(envVars).forEach(([key, value]) => {
  const regex = new RegExp(`%${key}%`, 'g');
  htmlContent = htmlContent.replace(regex, value);
});

// Write the updated content back to index.html
fs.writeFileSync(indexPath, htmlContent); 