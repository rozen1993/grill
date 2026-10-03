import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = env.PUBLIC_SITE_URL?.trim();
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('PUBLIC_SITE_URL debe ser el origen HTTPS del dominio real, sin rutas, credenciales ni parámetros.');
  }
}
if (env.PUBLIC_LAUNCH_READY === 'true' && !site) {
  throw new Error('Configura PUBLIC_SITE_URL antes de habilitar la indexación.');
}
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
});
