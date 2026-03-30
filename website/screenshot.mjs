import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const isMobile = label === 'mobile';
const viewport = isMobile
  ? { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 }
  : { width: 1440, height: 900 };

let n = 1;
while (fs.existsSync(path.join(screenshotsDir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) {
  n++;
}

const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outputPath = path.join(screenshotsDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'C:/Users/dmanf/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
});
const page = await browser.newPage();
await page.setViewport(viewport);
await page.goto(url, { waitUntil: 'networkidle2' });

// Scroll through the full page so IntersectionObserver triggers fade-ins
await page.evaluate(async () => {
  await new Promise(resolve => {
    const distance = 300;
    const delay = 80;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, delay);
  });
});
await new Promise(r => setTimeout(r, 600));

await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: temporary screenshots/${filename}`);
