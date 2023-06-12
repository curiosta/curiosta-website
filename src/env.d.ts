/// <reference types="astro/image/client" />
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
type ImportMetaEnv = Partial<
  Record<`PUBLIC_${keyof PublicEnvironmentVariables}`, string>
> & Partial<Record<keyof PrivateEnvVariables, string>>;

// Do not prefix 'PUBLIC_' here, we are already adding that in type above.
interface PublicEnvironmentVariables {
  BASE_URL: string;
  STRIPE_PUBLISHABLE_KEY: string;
  MEILISEARCH_HOST: string;
  MEILISEARCH_API: string;
}

interface PrivateEnvVariables {
  CONTENTFUL_SPACE_ID: string;
  CONTENTFUL_ACCESS_TOKEN: string;
}