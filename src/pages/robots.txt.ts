import type { APIRoute } from 'astro';
import { business } from '../data/site';
export const GET: APIRoute = () => {
  const text = business.domain && business.launchReady
    ? `User-agent: *\nAllow: /\nDisallow: /solicitud-recibida/\nDisallow: /demo/\nDisallow: /privacidad/\nDisallow: /condiciones/\nDisallow: /*?q=\nSitemap: ${new URL('/sitemap.xml',business.domain).href}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
};
