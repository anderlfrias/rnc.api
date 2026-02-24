/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    return res.json({
      name: 'RNC API - Scrapper',
      version: '2.0.0',
      docs: '/docs'
    });
  },

  docs: async function (req, res) {
    return res.json({
      api: 'RNC API - Scrapper',
      description: 'API para búsqueda de RNC y scraping de datos de la DGII.',
      version: '2.0.0',
      endpoints: [
        {
          path: '/api/scraping?rnc={rnc}',
          method: 'GET',
          description: 'Obtiene los datos del contribuyente directamente desde la DGII vía scraping.',
          params: {
            rnc: 'RNC o Cédula del contribuyente (9 u 11 dígitos).'
          }
        },
        {
          path: '/api/rnc/:rnc',
          method: 'GET',
          description: 'Busca el RNC en la base de datos local. Si no existe, realiza el scraping y lo guarda.',
          params: {
            rnc: 'RNC o Cédula del contribuyente.'
          }
        }
      ]
    });
  }

};

