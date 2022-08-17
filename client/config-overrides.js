const { useBabelRc, addWebpackAlias, override } = require("customize-cra");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const path = require("path");

const resolve = (src) => path.resolve(__dirname, src);

const smp = new SpeedMeasurePlugin();

module.exports = {
  webpack: smp.wrap(
    override(
      useBabelRc(),
      addWebpackAlias({
        "@Atom": resolve("./src/Component/Atom/"),
        "@Core": resolve("./src/Component/Core/"),
        "@Hook": resolve("./src/Hook/"),
        "@Page": resolve("./src/Component/Page/"),
        "@Molecules": resolve("./src/Component/Molecules/"),
        "@Organism": resolve("./src/Component/Organism/"),
        "@Template": resolve("./src/Component/Template/"),
        "@Hoc": resolve("./src/Component/Hoc/"),
        "@Common": resolve("./src/Common/"),
        "@Asset": resolve("./src/Asset/"),
        "@Recoil": resolve("./src/Recoil/"),
        "@Socket": resolve("./src/Socket/"),
      })
    )
  ),
};
