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

if (!import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID || !import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Could not find PUBLIC_CONTENTFUL_ACCESS_TOKEN or PUBLIC_CONTENTFUL_SPACE_ID!');
};

// client is not initialized. initializing...
const contentful = contentfulClient.createClient({
  space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: "cdn.contentful.com",
});

export default contentful