import { useBabelRc, removeModuleScopePlugin, override } from "customize-cra";

module.exports = override(useBabelRc(), removeModuleScopePlugin());
