const puppeteer = require('puppeteer');
// const { WEB_DGII, INPUT_RNC, BUTTON_RNC } = require('../../constants/dgii.constant');

const WEB_DGII = 'https://www.dgii.gov.do/app/WebApps/ConsultasWeb/consultas/rnc.aspx';
const INPUT_RNC = 'input[id="ctl00_cphMain_txtRNCCedula"]';
const BUTTON_RNC = 'input[id="ctl00_cphMain_btnBuscarPorRNC"]';
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
    try {
      const { rnc } = inputs;

      // console.log('TABLE_DATOS_CONTRIBUYENTE', TABLE_DATOS_CONTRIBUYENTE);

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // Navega a la página del formulario
      await page.goto(WEB_DGII);

      // Completa el formulario con los datos necesarios
      await page.type(INPUT_RNC, rnc);
      // Puedes agregar más líneas para completar otros campos del formulario

      // Envía el formulario
      await page.click(BUTTON_RNC);

      // Espera a que la página cargue y renderice la tabla
      await page.waitForSelector('#ctl00_cphMain_dvDatosContribuyentes tbody tr');

      // Extrae los datos de la tabla
      const data = await page.evaluate(() => {
        const table = document.getElementById('ctl00_cphMain_dvDatosContribuyentes');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        return rows.map(row => {
          const columns = Array.from(row.querySelectorAll('td'));
          return columns.map(column => column.textContent);
        });
      });

      await browser.close();

      let datosDelContribuyente;

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        datosDelContribuyente = {
          ...datosDelContribuyente,
          [item[0]]: item[1].trim()
        };
      }

      return exits.success({
        success: true,
        message: 'Datos del contribuyente obtenidos correctamente',
        data: datosDelContribuyente
      });
    } catch (error) {
      return exits.error({
        success: false,
        message: 'No se pudo obtener los datos del contribuyente',
        error
      });
    }
  }


};

