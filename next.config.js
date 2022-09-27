module.exports = {
  images: {
    domains: ["images.ctfassets.net"],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { topLevelAwait: true, layers: true };
    // config.experiments.topLevelAwait = true
    return config;
  },
};
