# Verificación de la entrega

## Comprobaciones realizadas

- Revisión previa de los cuatro PNG originales y las 28 páginas del PDF, tanto extracción de texto como renderizado visual.
- `npm.cmd run build`: chequeo de Astro sin errores, warnings ni hints; build estático completado, 25 páginas HTML y los endpoints robots/sitemap.
- `scripts/check_static.py`: comprueba títulos/descripciones, enlaces/activos, anclas, etiquetas de campos, dimensiones y alt de imágenes, IDs únicos, exclusión de demos, robots y sitemap provisionales.
- Se localizaron y corrigieron el tipo del campo reutilizable y las asociaciones explícitas de los filtros.
- Contraste calculado: botón normal 5.50:1, enlaces 5.79:1, texto secundario 6.32:1 y errores 6.57:1. El hover canónico con texto #17212B daba 4.35:1; se oscureció solo el texto del hover a #101820 para alcanzar 4.78:1. El estado presionado usa naranja oscuro con blanco. Controles de acción con altura mínima 48 px.
- Se consultó `npm audit`; la alerta sin parche se detalla en `DEPENDENCIAS.md`.
- `node scripts/check_release.mjs`: build aislado en `tmp/release-check/` con un dominio reservado `.invalid`, sin publicación. Comprueba canonical, 21 URL útiles en sitemap, reglas robots, indexación de páginas públicas y exclusiones de confirmación, legales y demos. Resultado sin incidencias en `docs/verification/release-checks.json`.

## Revisión de navegador pendiente

El navegador rechazó abrir `http://127.0.0.1:4321/` indicando permiso denegado por el usuario. Se solicitó autorización para concluir la revisión. No se han generado capturas del sitio ni se ha afirmado haber verificado geometría en el navegador.

Pendiente comprobar visualmente 360, 390, 768, 1024 y 1440 px; capturar inicio, catálogo, ficha, paquetes y cotización; verificar ausencia de desbordamiento, navegación de teclado, menú/filtros y retorno de foco, galería, FAQ y estados del formulario. Esta sección se actualizará si se autoriza el acceso durante la tarea.

## Recepción de formularios

No se puede certificar recepción comercial: no hay servicio ni destinatario configurados. La interfaz valida y mantiene los datos, y el envío queda expresamente no realizado sin endpoint. La pantalla de recepción exige el acuse de un receptor real; la demo de desarrollo se excluye del build.

## Preparación para GitHub y Vercel — 3 de octubre de 2026

Se comprobó una copia limpia formada únicamente por los 76 archivos admitidos por `.gitignore` (aproximadamente 1,8 MB), sin kit, PNG originales, dependencias, cachés ni informes generados. `npm ci --offline --no-audit --no-fund` instaló desde el lockfile y `npm run build` generó 25 páginas, con 0 errores, warnings o hints. El proyecto no depende de los archivos locales excluidos. Esta prueba local no sustituye el despliegue ni la revisión visual pendiente.

`vercel.json` fija Astro, `npm ci`, `npm run build` y `dist`; Node 24 está fijado en `package.json` y `.nvmrc`. Las carpetas generadas `dist/` y `tmp/` se retiraron de la carpeta de trabajo a un respaldo temporal reversible. Las referencias originales y las dependencias instaladas se conservan localmente, excluidas de Git y del envío por Vercel CLI.
