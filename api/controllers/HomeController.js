/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function (req, res) {
    try {
      return res.json({
        message: 'Bienvenido a la API de scraping',
        endpoints: [
          {
            url: '/scraping',
            method: 'GET',
            description: 'Scraping de la DGII'
          },
          {
            url: '/rnc/:rnc',
            method: 'GET',
            description: 'Busqueda de RNC'
          }
        ]
      });
    } catch (err) {
      console.error(err);
    }
  }

};

