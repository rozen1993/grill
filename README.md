# GrillRent

Web estática en **Astro + Tailwind CSS**, con TypeScript para las interacciones. Dirección visual: opción 2 del kit. Las referencias originales se conservan localmente y quedan excluidas del repositorio.

## Abrir en Windows / PowerShell

Usa Node.js 24, fijado en `package.json` y `.nvmrc` para mantener la misma versión mayor en local y Vercel.

```powershell
cd C:\Users\MARCO\Desktop\GrillRent
npm.cmd ci
npm.cmd run dev
```

Abre **http://127.0.0.1:4321/**. En PowerShell se usa `npm.cmd` para evitar depender de la política de ejecución de `npm.ps1`. Si el puerto está ocupado, Astro indica el puerto nuevo.

```powershell
npm.cmd run build
npm.cmd run preview
```

`build` ejecuta primero el chequeo de Astro y genera `dist/`. `preview` permite revisar ese resultado en el mismo puerto predeterminado. No se necesita un adaptador ni Next.js. No se ha publicado el sitio.

## Páginas implementadas

- Inicio: `/`
- Catálogo: `/equipos/`, `/equipos/parrillas/`, `/equipos/cilindros/`, `/equipos/accesorios/`
- Fichas: `/equipos/parrilla-a-carbon/`, `/equipos/cilindro-para-cocinar/`, `/equipos/set-de-utensilios/`
- Paquetes: `/paquetes/`, `/paquetes/esencial/`, `/paquetes/familiar/`, `/paquetes/celebracion/`
- Cotización en dos pasos: `/cotizar/`; estado de recepción: `/solicitud-recibida/`
- Información: `/como-funciona/`, `/nosotros/`, `/contacto/`, `/preguntas-frecuentes/`
- Guías: `/guias/`, `/guias/como-elegir-parrilla/`, `/guias/preparar-tu-reunion/`, `/guias/parrilla-o-cilindro/`
- Apoyo: `/privacidad/`, `/condiciones/`, `/404.html` (404 del hosting), `/404/` en desarrollo
- Técnicos: `/sitemap.xml`, `/robots.txt`
- Solo desarrollo: `/demo/estados/`, excluida del build.

## Editar contenido

- `src/data/site.ts`: identidad, canales y pendientes comerciales. Los campos no confirmados están en `null`.
- `src/data/catalog.ts`: categorías, equipos, composición propuesta de los tres paquetes, FAQ y pasos.
- `src/data/guides.ts`: tres artículos con secciones e índice.
- `src/components/`: botones, marca provisional, iconos, fotos, tarjetas, galería, filtros, campos, FAQ y llamadas a cotizar.
- `src/layouts/Layout.astro`: cabecera, menú móvil, pie y metadatos.
- `src/styles/global.css`: tokens, sistema responsive y estilos compartidos; Tailwind 4 con `@tailwindcss/vite`.
- `src/scripts/`: búsqueda/orden/filtros, validación, dos pasos y contrato de recepción.
- `public/images/`: imágenes WebP 480/960/1440 necesarias para la web, incluidas en Git.
- `assets/concepts/`: originales opcionales, conservados solo en local. `scripts/prepare_images.py` los convierte a WebP si necesitas regenerarlos (requiere Pillow); no se ejecuta durante el build.

Manrope y Caveat se sirven localmente a través de Fontsource. No hay rastreadores, reseñas, precios, domicilios o contactos ficticios.

## Configuración y publicación

### GitHub y Vercel

Sube el proyecto mediante Git o GitHub Desktop para que se apliquen las exclusiones de `.gitignore`. Se incluyen el código, los WebP, la documentación, `package.json`, `package-lock.json` y los archivos de configuración. Se excluyen dependencias, builds, temporales, secretos, informes generados, el kit y los PNG originales locales. Si usas la carga manual desde el navegador de GitHub, respeta esas mismas exclusiones: `.gitignore` no filtra archivos arrastrados manualmente.

Importa el repositorio en Vercel usando la raíz del proyecto. `vercel.json` fija el framework Astro, instalación `npm ci`, build `npm run build` y salida `dist`. Node.js se fija a `24.x`. El sitio es estático y no requiere un adaptador. Configura las variables de `.env.example` en el panel de Vercel, sin subir un `.env` al repositorio.

Mantén `PUBLIC_LAUNCH_READY=false` para una primera revisión publicada como maqueta. El dominio y el receptor de formularios pueden añadirse cuando estén confirmados; activar la indexación no conecta los formularios.

Referencias: [Astro en Vercel](https://vercel.com/docs/frameworks/frontend/astro) y [Node.js 24 en Vercel](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions).

Copia `.env.example` a `.env` para configurar un dominio real, un servicio de formularios y, opcionalmente, un WhatsApp verificado. **Las variables `PUBLIC_` son visibles en el cliente: no pongas secretos.** Consulta [FORMULARIOS](docs/FORMULARIOS.md) y [PENDIENTES](docs/PENDIENTES.md).

El proyecto viene con indexación bloqueada, porque la oferta, las fotos y los documentos legales están pendientes. `PUBLIC_LAUNCH_READY=true` y `PUBLIC_SITE_URL` habilitan los metadatos y el sitemap de páginas útiles después de revisar los pendientes. Las confirmaciones y los documentos legales pendientes permanecen excluidos. La activación requiere un nuevo build.

En el estado entregado, el formulario valida y conserva los campos entre pasos, pero **no envía solicitudes**: no hay un servicio configurado. La pantalla de éxito requiere una respuesta afirmativa del servicio real. Una solicitud nunca confirma una reserva.

## Verificación

```powershell
npm.cmd run check
npm.cmd run build
python scripts/check_static.py
node scripts/check_release.mjs
```

El informe estático queda en `docs/verification/static-checks.json`. La prueba de configuración de publicación usa un dominio reservado y escribe únicamente en `tmp/release-check/`, sin cambiar la configuración real ni publicar. Las comprobaciones de navegador y su alcance se documentan en `docs/VERIFICACION.md`.

La alerta de dependencias detectada y sus límites se documentan en `docs/DEPENDENCIAS.md`. Antes de desplegar, consulta nuevamente `npm.cmd audit`.

Documentación oficial consultada: [instalación de Astro](https://docs.astro.build/en/install-and-setup/), [Tailwind en Astro](https://docs.astro.build/en/guides/styling/#tailwindcss).
