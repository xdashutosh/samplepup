import puppeteer from "puppeteer";

export const scrap = async (req, res) => {
  try {
    const {word,datapage}=req.body;  
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Render
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Use the system-installed Chromium
    });

    const page = await browser.newPage();

    await page.goto(`https://hqporn.xxx/search/${word}/${datapage}/`, {
        waitUntil: "domcontentloaded", // Wait until the DOM is fully loaded
      });
    
    
      // Wait for a specific element containing dynamic content
      await page.waitForSelector('.js-gallery-link'); // Adjust to a meaningful selector like IMDb's titles
      await page.waitForSelector('.js-gallery-img img'); 
      await page.waitForSelector('.b-thumb-item__duration span'); // Adjust to a meaningful selector like IMDb's titles
      
      
    
      // Extract data
      const data1 = await page.evaluate(() => {
        // Extract specific data such as titles or other information
        return Array.from(document.querySelectorAll('.js-gallery-img img')).map((el) => el.src);
      });
      const videotit = await page.evaluate(() => {
        // Extract specific data such as titles or other information
        return Array.from(document.querySelectorAll('.js-gallery-img img')).map((el) => el.alt);
      });
      const duration = await page.evaluate(() => {
        // Extract specific data such as titles or other information
        return Array.from(document.querySelectorAll('.b-thumb-item__duration span')).map((el) => el.innerText);
      });
    
     
      const data = await page.evaluate(() => {
        // Extract specific data such as titles or other information
        return Array.from(document.querySelectorAll('.js-gallery-link')).map((el) => el.href);
      });
    
      const preview = await page.evaluate(() => {
        // Extract specific data such as titles or other information
        return Array.from(document.querySelectorAll('.js-gallery-link')).map((el) => el.getAttribute('data-preview'));
      });
     
      const combinedArray = data1.map((title, index) => ({
        title:videotit[index],
        imgsrc: title,
        siteurl: data[index],
        duration:duration[index],
        preview:preview[index]
      }));

    await browser.close();

    // Send the result as a JSON response
    res.json({ combinedArray });
    
  } catch (error) {
    console.error("Scraping failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};
