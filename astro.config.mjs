import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import image from "@astrojs/image";
import aws from "astro-sst/lambda";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://curiosta.com/",
  adapter: aws(),
  integrations: [tailwind(), preact({ compat: true }), image()],
  server: {
    // port: 8000
  },
});
