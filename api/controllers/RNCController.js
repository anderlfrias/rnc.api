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
        // Tiempo de Vida Util (TTL) de 30 días en milisegundos
        const TTL_MS = 30 * 24 * 60 * 60 * 1000;
        const ahora = new Date().getTime();
        const ultimaActualizacion = new Date(rncEncontrado.updatedAt).getTime();

        if (ahora - ultimaActualizacion < TTL_MS) {
          return res.ok(rncEncontrado);
        } else {
          // Si expiró, realizar scrapingDGII nuevamente
          const resp = await sails.helpers.scrapingDgii(rnc);
          if (resp.success) {
            const rncActualizado = await RNC.updateOne({ rnc }).set({
              datosContribuyente: resp.data
            });
            return res.ok(rncActualizado || rncEncontrado);
          }
          // Si falla DGII, devolvemos el dato viejo que teníamos para no dejar sin respuesta
          return res.ok(rncEncontrado);
        }
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

      return res.badRequest({ ...resp, err: resp.message || 'No se pudo obtener los datos del contribuyente' });
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  }

};

