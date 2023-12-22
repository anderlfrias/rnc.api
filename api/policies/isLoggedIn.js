const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
  const token = req.headers.authorization;

  jwt.verify(token, sails.config.session.secret, (err, decoded) => {
    if (err) {
      return res.forbidden();
    }

    req.user = decoded;
    proceed();
  });
};
