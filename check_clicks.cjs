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

  const inputPos = await page.evaluate(() => {
    const input = document.querySelector('input[name="name"]');
    if (!input) return null;
    const rect = input.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });

  if (!inputPos) {
    console.log('Could not find input');
  } else {
    console.log('Input position:', inputPos);
    
    const topElement = await page.evaluate((pos) => {
      const el = document.elementFromPoint(pos.x, pos.y);
      if (!el) return 'none';
      return {
        tagName: el.tagName,
        className: el.className,
        id: el.id
      };
    }, inputPos);

    console.log('Top element at input position:', topElement);
  }

  await browser.close();
})();
