const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');

  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const loader = document.querySelector('.z-\\[100\\]');
    if (loader) loader.remove();
  });

  await new Promise(r => setTimeout(r, 1000));

  // Let's add a global click listener to see what gets clicked
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.evaluate(() => {
    document.addEventListener('click', (e) => {
      console.log('Clicked on:', e.target.tagName, e.target.className);
    });
  });

  const buttonPos = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('a')).find(el => el.textContent.includes('Download Resume'));
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (buttonPos) {
    console.log('Clicking at', buttonPos);
    await page.mouse.click(buttonPos.x, buttonPos.y);
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
})();
