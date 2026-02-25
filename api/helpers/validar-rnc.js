module.exports = {

  friendlyName: 'Validar RNC o Cédula Dominicana',

  description: 'Valida si un patrón numérico corresponde a un RNC o Cédula válido según el algoritmo del Módulo 11 (o Módulo 10 para cédulas) de la DGII.',

  inputs: {
    rnc: {
      type: 'string',
      required: true,
      description: 'El RNC o cédula a validar (9 u 11 dígitos).'
    }
  },

  exits: {
    success: {
      description: 'Retorna true si es válido, falso de lo contrario.'
    }
  },

  fn: async function (inputs) {
    let rnc = inputs.rnc.replace(/[- ]/g, ''); // Limpiar guiones y espacios

    // Debe tener 9 (RNC) u 11 (Cédula) caracteres exactos numéricos
    if (!/^[0-9]+$/.test(rnc) || (rnc.length !== 9 && rnc.length !== 11)) {
      return false;
    }

    // Validación para RNC (Empresas - 9 dígitos, Módulo 11)
    if (rnc.length === 9) {
      const weights = [7, 9, 8, 6, 5, 4, 3, 2];
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        sum += parseInt(rnc.charAt(i), 10) * weights[i];
      }

      const residue = sum % 11;
      let verifierDigit;
      if (residue === 0) verifierDigit = 2;
      else if (residue === 1) verifierDigit = 1;
      else verifierDigit = 11 - residue;

      return verifierDigit === parseInt(rnc.charAt(8), 10);
    }

    // Validación para Cédulas (Personas Físicas - 11 dígitos, Luhn/Módulo 10)
    if (rnc.length === 11) {
      let sum = 0;
      let multiplier = 1;

      for (let i = 0; i < 10; i++) {
        let calc = parseInt(rnc.charAt(i), 10) * multiplier;
        if (calc > 9) calc = (calc % 10) + 1; // Sumar dígitos p.ej: 18 -> 1 + 8 = 9
        sum += calc;
        multiplier = multiplier === 1 ? 2 : 1;
      }

      let verifierDigit = (10 - (sum % 10)) % 10;
      return verifierDigit === parseInt(rnc.charAt(10), 10);
    }

    return false;
  }
};
