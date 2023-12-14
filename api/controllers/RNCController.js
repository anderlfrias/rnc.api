/**
 * RNCController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getByRNC: async function (req, res) {
    try {
      const { rnc } = req.params;

      if (!rnc) {
        return res.badRequest('RNC requerido');
      }

      const rncEncontrado = await RNC.findOne({ rnc });

      if (rncEncontrado) {
        return res.ok(rncEncontrado);
      }

      const resp = await sails.helpers.scrapingDgii(rnc);

      if (resp.success) {
        const rncCreado = await RNC.create({
          rnc,
          datosContribuyente: resp.data
        }).fetch();

        if (!rncCreado) {
          return res.ok({
            rnc,
            datosContribuyente: resp.data
          });
        }

        return res.ok(rncCreado);
      }

      console.log(resp);
      return res.badRequest(resp.message);
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  }

};

