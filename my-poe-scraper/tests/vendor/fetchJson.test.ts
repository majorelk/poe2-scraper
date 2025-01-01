import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { fetchJson, langUrls, urls } from '../../src/vendor/fetchJson';

// Mock the necessary modules
jest.mock('fs');
jest.mock('path');
jest.mock('axios');

describe('fetchJson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create output directories and fetch JSON data', async () => {
    // Mock fs.existsSync to always return false
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Mock fs.mkdirSync to do nothing
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

    // Mock axios.get to return a resolved promise with mock data
    (axios.get as jest.Mock).mockResolvedValue({ data: { mock: 'data' } });

    // Mock fs.writeFileSync to do nothing
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    await fetchJson();

    // Check that fs.mkdirSync was called for each language
    for (const lang in langUrls) {
      const outputDir = path.join(__dirname, `../../vendor/json-api/${lang}`);
      expect(fs.mkdirSync).toHaveBeenCalledWith(outputDir, { recursive: true });
    }

    // Check that axios.get was called for each URL and language
    for (const lang in langUrls) {
      for (const relativeUrl of urls) {
        const url = `${langUrls[lang]}${relativeUrl}`;
        expect(axios.get).toHaveBeenCalledWith(url);
      }
    }

    // Check that fs.writeFileSync was called with the correct file paths and data
    for (const lang in langUrls) {
      for (const relativeUrl of urls) {
        const filename = path.basename(relativeUrl);
        const filePath = path.join(__dirname, `../../vendor/json-api/${lang}/${filename}.json`);
        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, JSON.stringify({ mock: 'data' }, null, 2));
      }
    }
  });

  it('should handle errors during fetching JSON data', async () => {
    // Mock fs.existsSync to always return false
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    // Mock fs.mkdirSync to do nothing
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});

    // Mock axios.get to return a rejected promise
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    // Mock console.error to track error messages
    console.error = jest.fn();

    await fetchJson();

    // Check that console.error was called with the correct error message
    for (const lang in langUrls) {
      for (const relativeUrl of urls) {
        const url = `${langUrls[lang]}${relativeUrl}`;
        expect(console.error).toHaveBeenCalledWith(`Failed to fetch JSON from: ${url}`, expect.any(Error));
      }
    }
  });
});