const path = require("path");

module.exports = {
  stories: ["../src/Component/Atom/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@Atom"] = path.resolve(__dirname, "../src/Component/Atom");
    config.resolve.alias["@Core"] = path.resolve(__dirname, "../src/Component/Core");
    config.resolve.alias["@Hook"] = path.resolve(__dirname, "../src/Hook");
    config.resolve.alias["@Page"] = path.resolve(__dirname, "../src/Component/Page");
    config.resolve.alias["@Molecules"] = path.resolve(__dirname, "../src/Component/Molecules");
    config.resolve.alias["@Organism"] = path.resolve(__dirname, "../src/Component/Organism");
    config.resolve.alias["@Template"] = path.resolve(__dirname, "../src/Component/Template");
    config.resolve.alias["@Hoc"] = path.resolve(__dirname, "../src/Component/Hoc");
    config.resolve.alias["@Util"] = path.resolve(__dirname, "../src/Util");
    config.resolve.alias["@Recoil"] = path.resolve(__dirname, "../src/Recoil");
    config.resolve.alias["@Socket"] = path.resolve(__dirname, "../src/Socket");
    return config;
  },
};
