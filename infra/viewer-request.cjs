// CloudFront Function (cloudfront-js-2.0), viewer-request, default behaviour only.
// 1) www.curiosta.com -> 301 https://curiosta.com (path + query kept)
// 2) /path (no extension) -> 301 /path/
// 3) /path/ -> /path/index.html (S3 REST origin has no directory index)
// Keep in sync with the inline copy in template.yaml (ViewerRequestFunction.FunctionCode).
function handler(event) {
  var req = event.request;
  var host = (req.headers.host && req.headers.host.value) || '';
  var uri = req.uri;
  if (host === 'www.curiosta.com') {
    var qs = [];
    for (var k in req.querystring) {
      var q = req.querystring[k];
      if (q.multiValue) { for (var i = 0; i < q.multiValue.length; i++) qs.push(k + '=' + q.multiValue[i].value); }
      else qs.push(k + (q.value !== '' ? '=' + q.value : ''));
    }
    return { statusCode: 301, statusDescription: 'Moved Permanently', headers: { location: { value: 'https://curiosta.com' + uri + (qs.length ? '?' + qs.join('&') : '') }, 'cache-control': { value: 'max-age=3600' } } };
  }
  if (uri.endsWith('/')) { req.uri = uri + 'index.html'; return req; }
  var last = uri.substring(uri.lastIndexOf('/') + 1);
  if (last.indexOf('.') === -1) {
    return { statusCode: 301, statusDescription: 'Moved Permanently', headers: { location: { value: uri + '/' } } };
  }
  return req;
}
if (typeof module !== 'undefined') module.exports = { handler };
