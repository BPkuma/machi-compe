export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // *.workers.dev へのアクセスを新ドメインに転送
    if (url.hostname.endsWith('.workers.dev')) {
      url.hostname = 'machi-compe.com';
      return Response.redirect(url.toString(), 301);
    }

    const response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get('content-type') || '';

    // HTMLはキャッシュしない（デプロイ後即反映）
    if (contentType.includes('text/html')) {
      const newResponse = new Response(response.body, response);
      newResponse.headers.set('Cache-Control', 'no-cache');
      return newResponse;
    }

    return response;
  }
};
