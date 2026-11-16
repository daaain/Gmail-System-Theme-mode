// Renders 1280x800 screenshots for the Chrome Web Store listing from the
// fake Gmail pages in test/fixtures/, with the extension loaded into Chrome.
//
// Run with `npm run screenshots`. The PNGs are saved in
// web-ext-artifacts/screenshots/.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import puppeteer from 'puppeteer';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'web-ext-artifacts', 'screenshots');
const GMAIL_URL = 'https://mail.google.com/mail/u/0/#inbox';
// The store accepts 1280x800 or 640x400.
const VIEWPORT = { width: 1280, height: 800 };

const SHOTS = [
  { name: '1-inbox-light', fixture: 'gmail.html', scheme: 'light' },
  { name: '2-inbox-dark', fixture: 'gmail.html', scheme: 'dark' },
  { name: '3-picture-theme-compose-dark', fixture: 'gmail-image-theme-light.html', scheme: 'dark' },
  { name: '4-dark-newsletter', fixture: 'gmail-dark-email.html', scheme: 'dark' },
];

// Copy only the files that ship, like the tests do.
function packageExtension() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gmail-theme-ext-'));
  for (const entry of ['manifest.json', 'contentScript.js', 'popup.html', 'images']) {
    fs.cpSync(path.join(root, entry), path.join(dir, entry), { recursive: true });
  }
  return dir;
}

async function screenshot(browser, { name, fixture, scheme }) {
  const body = fs.readFileSync(path.join(root, 'test', 'fixtures', fixture), 'utf8');
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.setRequestInterception(true);
  page.on('request', (request) => request.respond({ status: 200, contentType: 'text/html', body }));
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
  await page.goto(GMAIL_URL);
  if (scheme === 'dark') {
    await page.waitForFunction(() => !!document.getElementById('dark-mode-style'), { timeout: 5000 });
  }
  // Let the content script (run_at: document_idle) settle.
  await new Promise((resolve) => setTimeout(resolve, 500));
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file });
  await page.close();
  return file;
}

const extensionDir = packageExtension();
fs.mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({ headless: true, enableExtensions: true, pipe: true });
try {
  await browser.installExtension(extensionDir);
  for (const shot of SHOTS) console.log(await screenshot(browser, shot));
} finally {
  await browser.close();
  fs.rmSync(extensionDir, { recursive: true, force: true });
}
