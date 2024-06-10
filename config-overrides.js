module.exports = function override(config, env) {
  // change the entry point to src/index.js
  config.output.publicPath = '';

  // if have a custom path for the manifest.json file, you can adjust it here
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'ManifestPlugin') {
      plugin.opts.fileName = 'manifest.json'; // Adjust the fileName property as needed
    }
  });

  return config;
};
