# SEO implementado y validación pendiente

Cada página tiene título y descripción únicos, contenido HTML rastreable, navegación interna, breadcrumbs y encabezados semánticos. Las imágenes reservan dimensiones, usan alt, `srcset` y WebP; las principales cargan con prioridad, las inferiores con lazy loading. Contenido equivalente en móvil. No se insertaron precios, reseñas ni datos estructurados comerciales ficticios.

`PUBLIC_SITE_URL` genera canonical y URL de Open Graph con el dominio configurado. Sin dominio confirmado se omiten estas URL en vez de inventar un dominio. El favicon y las fuentes son locales.

## Entornos

- Por defecto: `noindex, follow` para todas las páginas, `robots.txt` bloquea el rastreo y sitemap vacío. Pensado para maqueta no publicada.
- Después de revisar pendientes, `PUBLIC_LAUNCH_READY=true` junto con el dominio habilita indexación y sitemap con 21 rutas útiles.
- `/solicitud-recibida/`, páginas legales pendientes, 404 y demos no se indexan. Las demos se excluyen del build.
- Una búsqueda `?q=` se marca noindex en cliente y tiene una regla robots. La interfaz de búsqueda usa filtrado local, no crea páginas SEO de resultados. En hosting se recomienda un `X-Robots-Tag: noindex` para URL con `q`, porque el HTML estático no distingue query strings antes de ejecutar JS.
- Después de aprobar legales, retirar sus exclusiones en `robots.txt.ts` y el `noindex` explícito de su plantilla, y decidir si entran al sitemap. No activarlas mientras sigan siendo borradores.

No hay ubicación comercial confirmada. La investigación con DataForSEO queda pendiente de país, ciudad, idioma, dispositivo y alcance geográfico. No se hicieron llamadas de pago ni se inventaron volúmenes.

## Mapa propuesto, sin volúmenes

| Ruta | Término propuesto | Intención |
| --- | --- | --- |
| `/` | alquiler de parrillas y cilindros | Consultar alquiler |
| `/equipos/` | equipos para parrilla en alquiler | Explorar |
| `/equipos/parrillas/` | alquiler de parrillas | Elegir categoría |
| `/equipos/cilindros/` | alquiler de cilindros para cocinar | Elegir categoría |
| `/equipos/accesorios/` | accesorios para parrilla en alquiler | Complementar |
| `/equipos/parrilla-a-carbon/` | parrilla a carbón en alquiler | Consultar modelo |
| `/paquetes/` | paquetes de alquiler para parrillas | Comparar |
| `/guias/como-elegir-parrilla/` | cómo elegir una parrilla para reunión | Informarse |
| `/guias/preparar-tu-reunion/` | organizar una reunión al aire libre | Preparar |
| `/guias/parrilla-o-cilindro/` | parrilla o cilindro para cocinar | Comparar usos |

Validar términos regionales e intención con SERP real antes de ampliar contenido o añadir ciudad. No crear páginas de distritos sin cobertura real.
