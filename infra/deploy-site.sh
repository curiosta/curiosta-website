#!/usr/bin/env bash
# Upload dist/ to the curiosta-web site bucket and invalidate CloudFront.
# For AWS Admin only (see m1-deploy-runbook.md). Default is a DRY RUN; pass --apply to upload.
# Usage: infra/deploy-site.sh <bucket> <distribution-id> [--apply]
set -euo pipefail
BUCKET="${1:?bucket}"; DIST="${2:?distribution id}"; APPLY="${3:-}"
DRY="--dryrun"; [ "$APPLY" = "--apply" ] && DRY=""
[ -f dist/index.html ] || { echo "run 'npm run build' first"; exit 1; }
# Hashed assets: cache 1 year, immutable
aws s3 sync dist/_astro "s3://$BUCKET/_astro" $DRY --cache-control "public,max-age=31536000,immutable"
# Everything else (HTML, sitemap, robots, images): short browser cache, CloudFront invalidated below
aws s3 sync dist "s3://$BUCKET" $DRY --exclude "_astro/*" --cache-control "public,max-age=300,s-maxage=86400" --delete
if [ -z "$DRY" ]; then
  aws cloudfront create-invalidation --distribution-id "$DIST" --paths "/*" --query 'Invalidation.Id' --output text
else
  echo "(dry run) would invalidate /* on $DIST"
fi
