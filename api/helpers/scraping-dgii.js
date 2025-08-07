const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const URL_WEB_DGII = 'https://dgii.gov.do/app/WebApps/ConsultasWeb2/ConsultasWeb/consultas/rnc.aspx';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
const INPUT_RNC = 'cphMain_txtRNCCedula';
const BUTTON_RNC = 'cphMain_btnBuscarPorRNC';
module.exports = {


  friendlyName: 'Scraping DGII',


  description: '',


  inputs: {
    rnc: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

    error: {
      description: 'Error',
    }

  },


  fn: async function (inputs, exits) {
    // TODO
    const { rnc } = inputs;
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true, // Run browser in background (invisible)
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments
      });
      const page = await browser.newPage();

      // Set user agent to avoid detection
      await page.setUserAgent(USER_AGENT);

      // Navigate to the RNC consultation page
      await page.goto(URL_WEB_DGII, {
        waitUntil: 'networkidle2',
      });

      // Wait for the RNC input field
      const inputSelector = `#${INPUT_RNC}`;
      try {
        await page.waitForSelector(inputSelector, { timeout: 10000 });
      } catch (error) {
        const content = await page.content();
        sails.log.error('Input field not found. Page content:', content, '\nError:', error);
        throw new Error('Input field not found. Check selector or page structure.');
      }

      // Type the RNC number
      await page.type(inputSelector, rnc);

      // Click the search button
      const buttonSelector = `#${BUTTON_RNC}`;
      await page.waitForSelector(buttonSelector, { timeout: 5000 });
      await page.click(buttonSelector);

      // Wait for the results table or error message
      const tableSelector = '#cphMain_dvDatosContribuyentes';
      const errorSelector = '#cphMain_lblInformacion';
      await page.waitForSelector(`${tableSelector}, ${errorSelector}`, { timeout: 20000 });

      // Wait for network idle to ensure UpdatePanel content is loaded
      await page.waitForNetworkIdle({ idleTime: 1000, timeout: 10000 }).catch(() => {
        sails.log.warn('Network idle timeout, proceeding with parsing');
      });

      // Get page content and parse with Cheerio
      const content = await page.content();
      const $ = cheerio.load(content);

      // Log table content for debugging
      // const tableHtml = $(tableSelector).html();
      // Check for error message
      const errorMessage = $(errorSelector).text().trim();
      if (errorMessage) {
        throw new Error(`Search error: ${errorMessage}`);
      }

      // Extract data from the results table
      const result = {};
      const table = $(tableSelector);
      if (table.length) {
        table.find('tr').each((index, row) => {
          const cells = $(row).find('td');
          if (cells.length === 2) {
            const key = $(cells[0]).text().trim();
            const value = $(cells[1]).text().trim();
            result[key] = value;
          }
        });
      } else {
        throw new Error('Results table not found');
      }

      // Check if result is empty
      if (Object.keys(result).length === 0) {
        throw new Error('No data extracted from results table. Check RNC validity or table content.');
      }

      // Return the scraped data
      return exits.success({
        success: true,
        rnc: rnc,
        data: result,
      });
    } catch (error) {
      console.error('Error:', error);
      return exits.success({
        success: false,
        message: error.message || 'No se pudo obtener los datos del contribuyente',
        error: error
      });
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }


};

