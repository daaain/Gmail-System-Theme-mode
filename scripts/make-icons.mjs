// Renders images/icon.svg to the PNG sizes the manifest needs, using the
// Chrome that Puppeteer downloads for the tests.
import puppeteer from 'puppeteer';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imagesDir = path.join(root, 'images');
const svg = await readFile(path.join(imagesDir, 'icon.svg'), 'utf8');

const browser = await puppeteer.launch();
try {
  const page = await browser.newPage();
  for (const size of [16, 32, 48, 96, 128]) {
    await page.setViewport({ width: size, height: size });
    await page.setContent(
      `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`
    );
    const png = await page.screenshot({ omitBackground: true });
    await writeFile(path.join(imagesDir, `icon${size}.png`), png);
    console.log(`wrote icon${size}.png`);
  }
} finally {
  await browser.close();
}
