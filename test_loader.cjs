const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/');

  await new Promise(r => setTimeout(r, 2000));

  // Perform the drag and drop to plug it in
  const plug = await page.$('.cursor-grab'); // The draggable male plug
  if (plug) {
    const box = await plug.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();
  } else {
    console.log('Could not find plug');
  }

  await new Promise(r => setTimeout(r, 1000));

  // Click the power button
  const button = await page.$('button');
  if (button) {
    await button.click();
    console.log('Clicked power button');
  } else {
    console.log('Could not find power button');
  }

  // Wait for animations and AnimatePresence exit
  await new Promise(r => setTimeout(r, 4000));

  // Check if loader is still in DOM
  const loaderExists = await page.evaluate(() => {
    return !!document.querySelector('.z-\\[100\\]');
  });

  console.log('Does .z-[100] still exist?', loaderExists);

  await browser.close();
})();
