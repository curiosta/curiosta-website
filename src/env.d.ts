/// <reference types="astro/image/client" />
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
type ImportMetaEnv = Partial<Record<`PUBLIC_${keyof EnvironmentVariables}`, string>>


// Do not prefix 'PUBLIC_' here, we are already adding that in type above.
interface EnvironmentVariables {
  BASE_URL: string;
  CONTENTFUL_SPACE_ID: string;
  CONTENTFUL_ACCESS_TOKEN: string;
  STRIPE_PUBLISHABLE_KEY: string;
}