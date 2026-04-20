let config = {
  appName: "lognest-app",
  dbUrl: null,
};

function setConfig(userConfig) {
  config = { ...config, ...userConfig };
}

function getConfig() {
  return config;
}

module.exports = { setConfig, getConfig };
