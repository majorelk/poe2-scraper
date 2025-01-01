import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

export const langUrls: { [key: string]: string } = {
  en: 'https://www.pathofexile.com',
  ru: 'https://ru.pathofexile.com',
  ko: 'https://poe.game.daum.net',
  'cmn-Hant': 'https://pathofexile.tw',
  ja: 'https://jp.pathofexile.com',
};

export const urls: string[] = [
  '/api/trade2/data/filters',
  '/api/trade2/data/stats',
  '/api/trade2/data/items',
  '/api/trade2/data/static',
];

export async function fetchJson() {
  for (const lang in langUrls) {
    const outputDir = path.join(__dirname, `../vendor/json-api/${lang}`);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const relativeUrl of urls) {
      const url = `${langUrls[lang]}${relativeUrl}`;
      const filename = path.basename(relativeUrl);

      console.log(`Fetching JSON from: ${url} for language: ${lang}`);

      try {
        const response = await axios.get(url);
        const filePath = path.join(outputDir, `${filename}.json`);
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
        console.log(`Saved JSON to: ${filePath}`);
      } catch (error) {
        console.error(`Failed to fetch JSON from: ${url}`, error);
      }
    }
  }
}

// Uncomment the following line if you want to run fetchJson immediately when this file is executed
// fetchJson();