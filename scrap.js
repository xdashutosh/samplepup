import puppeteer from "puppeteer";

export const scrap = async (req, res) => {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true, // Run in headless mode
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // Required for Render
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Use the system-installed Chromium
    });

    const page = await browser.newPage();

    // Go to Hacker News
    await page.goto("https://www.cssinfotech.in/", {
      waitUntil: "domcontentloaded", // Wait until the DOM is fully loaded
    });

    // Wait for the title links to appear
    await page.waitForSelector("h1");

    // Extract titles and links
    const articles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("h1")).map((el) => ({
        title: el.innerText,
      }));
    });

    // Close the browser
    await browser.close();

    // Send the result as a JSON response
    res.json({ articles });
  } catch (error) {
    console.error("Scraping failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};
