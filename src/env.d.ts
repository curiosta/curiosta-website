/// <reference types="astro/client" />

declare module '*.svg' {
  const src: { src: string, width: number, height: number };
  export default src;
}