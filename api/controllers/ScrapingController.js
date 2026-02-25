/**
 * ScrapingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  scraping: async function (req, res) {
    try {
      const { rnc } = req.query;

      if (!rnc) {
        return res.badRequest('RNC requerido');
      }

      const isRncValid = await sails.helpers.validarRnc(rnc);
      if (!isRncValid) {
        return res.badRequest({ message: 'El RNC o Cédula provisto tiene un formato o dígito verificador numérico inválido.' });
      }

      const resp = await sails.helpers.scrapingDgii(rnc);
      if (resp.success) {
        return res.ok(resp);
      }

      return res.badRequest(resp);
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  }

};

