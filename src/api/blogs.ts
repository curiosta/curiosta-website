import type { Document } from "@contentful/rich-text-types";
import type { ContentfulClientApi } from "contentful";
export interface BlogPost {
  title: string;
  date: string;
  description: string;
  content: Document;
  slug: string;
  featuredImage: {
    fields: { title: string; url: string };
  };
}

let client: ContentfulClientApi<undefined>;
export const contentfulClient = async () => {
  // client is already initialized.
  if (client) return client;

  // client is not initialized. initializing...
  const module = await import('contentful');
  client = module.createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
    host: "cdn.contentful.com",
  });
}
