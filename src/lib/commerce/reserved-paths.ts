/** Paths routed by CloudFront to the store backend / admin / media. Never use them for pages. */
export const RESERVED_PATH_PREFIXES = ['/store', '/admin', '/app', '/hooks', '/health', '/media'] as const;
export function isReservedPath(path: string): boolean {
  return RESERVED_PATH_PREFIXES.some((p) => path === p || path.startsWith(p + '/'));
}
