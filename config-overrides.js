module.exports = function override(config, env) {
  // Change the entry point to src/index.js
  config.output.publicPath = '';
  // config.entry = {
  //   main: './src/index.js',
  // };
  // If you have a custom path for the manifest.json file, you can adjust it here
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'ManifestPlugin') {
      plugin.opts.fileName = 'manifest.json'; // Adjust the fileName property as needed
    }
  });

  return config;
};
