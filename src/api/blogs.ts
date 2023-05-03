import contentful from "contentful";
import type { Document } from "@contentful/rich-text-types";
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

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: "cdn.contentful.com",
});
