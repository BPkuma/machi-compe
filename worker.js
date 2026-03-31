export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // *.workers.dev へのアクセスを新ドメインに転送
    if (url.hostname.endsWith('.workers.dev')) {
      url.hostname = 'machi-compe.com';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  }
};
