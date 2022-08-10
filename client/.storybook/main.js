const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/Component/Atom/**/*.stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@Atom"] = toPath("src/Component/Atom");
    config.resolve.alias["@Core"] = toPath("src/Component/Core");
    config.resolve.alias["@Hook"] = toPath("src/Hook");
    config.resolve.alias["@Page"] = toPath("src/Component/Page");
    config.resolve.alias["@Molecules"] = toPath("src/Component/Molecules");
    config.resolve.alias["@Organism"] = toPath("src/Component/Organism");
    config.resolve.alias["@Template"] = toPath("src/Component/Template");
    config.resolve.alias["@Hoc"] = toPath("src/Component/Hoc");
    config.resolve.alias["@Util"] = toPath("src/Util");
    config.resolve.alias["@Recoil"] = toPath("src/Recoil");
    config.resolve.alias["@Socket"] = toPath("src/Socket");
    config.resolve.alias["@emotion/styled"] = toPath("node_modules/@emotion/styled");
    config.resolve.alias["@emotion/react"] = toPath("node_modules/@emotion/react");
    return config;
  },
};
