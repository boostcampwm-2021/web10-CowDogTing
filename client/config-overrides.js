const { useBabelRc, addWebpackAlias, override } = require("customize-cra");
const path = require("path");

const resolve = (src) => path.resolve(__dirname, src);

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    "@Atom": resolve("./src/Atom/"),
    "@Hook": resolve("./src/Hook/"),
    "@Page": resolve("./src/Page/"),
    "@Molecules": resolve("./src/Molecules/"),
    "@Organism": resolve("./src/Organism/"),
    "@Template": resolve("./src/Template/"),
    "@HOC": resolve("./src/HOC/"),
  })
);
