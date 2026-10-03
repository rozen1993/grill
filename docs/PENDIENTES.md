# Antes de publicar

La implementación usa el nombre provisional GrillRent y el contenido propuesto del kit. Ningún campo pendiente se ha rellenado con datos comerciales ficticios.

## Confirmación del negocio

1. Marca definitiva y logo aprobado.
2. Inventario real: modelos, fotografías propias, medidas, funcionamiento, capacidad y accesorios.
3. Oferta aprobada de Esencial, Familiar y Celebración. La mesa de apoyo del Familiar se muestra como propuesta por confirmar; no se ha abierto una categoría de mobiliario.
4. Precios, moneda, impuestos, duración, depósito/garantía y disponibilidad operativa. Hasta entonces: “Por cotizar”.
5. Entrega y recogida, costos, cobertura, carbón, limpieza y mobiliario extra. No se dan por incluidos.
6. País, ciudad y zonas atendidas. Sin esta información no se hizo investigación local con DataForSEO.
7. Teléfono/WhatsApp, correo, horario y domicilio solo si corresponde y son verificados.
8. Dominio y hosting. Configurar la página 404 del hosting con `dist/404.html` y servir rutas con barra final.
9. Servicio real y destinatario de cotizaciones y consultas. Validación de recepción, CORS, protección contra abuso y privacidad según `FORMULARIOS.md`.
10. Textos legales completos del responsable: privacidad, términos, cancelaciones, devolución y garantías. Las páginas actuales están marcadas como contenido en revisión, sin fecha ficticia de aprobación.

## Recursos visuales

Se aplicó la skill Imagegen para crear cuatro imágenes conceptuales independientes: reunión en jardín, parrilla a carbón, cilindro para cocinar/ahumar y utensilios. No se recortaron ni usaron las láminas como contenido web. Originales en `assets/concepts/`; versiones WebP en `public/images/`. Las imágenes de fichas y tarjetas están identificadas como ilustrativas. Reemplazarlas por fotos del equipo real y fotos autorizadas de reuniones antes de habilitar indexación.

La marca SVG/favicon es una propuesta local construida con formas básicas. No es un logo definitivo aprobado. Las fuentes locales Manrope y Caveat incluyen sus licencias en los paquetes Fontsource instalados. Manrope es la fuente funcional; Caveat se limita al acento de inicio.

## Orden para salir a producción

Validar y editar contenido → sustituir fotos → aprobar legales → configurar receptor y dominio → probar recepción real de ambos formularios → verificar oferta y cobertura → revisar `npm audit` → activar indexación → ejecutar nuevo build → subir `dist/` al hosting elegido → comprobar HTTPS, 404, robots, sitemap y recepción pública.

No se ha desplegado ni se ha contactado a terceros. El envío real sigue pendiente.
