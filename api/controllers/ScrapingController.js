/**
 * ScrapingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const { extract } = require('@extractus/article-extractor');
// const axios = require('axios');

module.exports = {
  scraping: async function (req, res) {
    try {
      const { rnc } = req.query;

      if (!rnc) {
        return res.badRequest('RNC requerido');
      }

      const resp = await sails.helpers.scrapingDgii(rnc);
      if (resp.success) {
        return res.ok({ data: resp.data });
      }

      return res.badRequest(resp);
    } catch (err) {
      console.error(err);
      return res.serverError(err);
    }
  }

};

