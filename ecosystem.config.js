module.exports = {
  apps : [{
    name   : 'rnc.api v2.0.0',
    script : './app.js',
    autorestart: true,
    env: {
      PORT: 3003,
    }
  }]
};
