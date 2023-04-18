import { defineConfig } from "astro/config";
import { astroAWSFunctions } from "@astro-aws/adapter";
import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: astroAWSFunctions(),
  integrations: [tailwind(), preact()],
});
