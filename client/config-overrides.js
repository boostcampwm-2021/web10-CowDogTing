const { useBabelRc, addWebpackAlias, override } = require("customize-cra");
const path = require("path");

const resolve = (src) => path.resolve(__dirname, src);

module.exports = override(
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
    "@Util": resolve("./src/Util/"),
    "@Asset": resolve("./src/Asset/"),
  })
);
