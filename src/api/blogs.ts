import type { Document } from "@contentful/rich-text-types";
import contentfulClient from 'contentful';
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

// client is not initialized. initializing...
const contentful = contentfulClient.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: "cdn.contentful.com",
});

export default contentful