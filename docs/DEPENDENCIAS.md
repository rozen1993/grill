# Dependencias y alerta conocida

Versiones compatibles fijadas por `package-lock.json`: Astro 7.3.5, Tailwind y plugin Vite 4.3.3, Astro Check 0.9.10 y TypeScript 6.0.3. TypeScript 7 no es compatible con el peer range del verificador; se eligió 6 sin forzar la resolución.

`npm audit` reporta dos entradas de severidad alta: `http-cache-semantics` y el paquete padre Astro. Corresponden a una misma alerta [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), relacionada con respuestas entre usuarios en cachés compartidas. La ficha oficial consultada el 3 de octubre de 2026 indica que no hay versión parcheada.

No se aplicó `audit fix --force`, porque npm propone retroceder a Astro 2.10.9 y cambiar la versión mayor del stack. La entrega genera archivos estáticos: no se despliega el servidor de desarrollo, una caché compartida de sesiones ni un servidor Astro SSR. Los formularios se reciben en un servicio HTTPS externo configurado aparte. Esto acota el riesgo del artefacto estático, pero no elimina la alerta de las herramientas de construcción.

Antes de publicar, repetir `npm.cmd audit` y actualizar cuando exista una versión corregida compatible. No exponer el servidor de desarrollo a Internet. El build local y el lockfile quedan conservados.
