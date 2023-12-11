/**
 * RNC.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    rnc: {
      type: 'string',
      required: true,
      unique: true
    },
    datosContribuyente: {
      type: 'json',
      required: true
    }
  },

};

