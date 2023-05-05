import { defineConfig } from 'astro/config'
import { astroAWSFunctions } from '@astro-aws/adapter'
import tailwind from '@astrojs/tailwind'
import preact from '@astrojs/preact'
import image from '@astrojs/image'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://curiosta.com/',
  adapter: astroAWSFunctions(),
  integrations: [tailwind(), preact(), image()]
})
