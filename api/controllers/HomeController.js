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
    });
  }

};

