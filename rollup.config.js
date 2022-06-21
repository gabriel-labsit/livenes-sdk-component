import css from "rollup-plugin-import-css";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy-assets";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    copy({
      assets: ["src/Assets"],
    }),
    css(),
    typescript({ objectHashIgnoreUnknownHack: true }),
  ],
  external: ["react", "react-dom", "./index.css"],
};
