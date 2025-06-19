import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import obfuscator from "vite-plugin-bundle-obfuscator";

export default defineConfig({
  plugins: [
    legacy({
      apply: "build",
    }),
    obfuscator({
      enable: true,
      apply: "build",
      threadPool: {
        enable: true,
        size: 4,
      },
      options: {
        compact: true,
        controlFlowFlattening: true,
        debugProtection: true,
        stringArray: true,
        stringArrayEncoding: ["rc4"],
      },
    }),
  ],
  // build:
  //   command === "build"
  //     ? {
  //         minify: "terser", // enable minification in build
  //         // optional: more terser options
  //         terserOptions: { compress: true, mangle: true }
  //       }
  //     : {
  //         minify: false, // disable minification during serve
  //         sourcemap: true, // helpful for dev debugging
  //       },
});
