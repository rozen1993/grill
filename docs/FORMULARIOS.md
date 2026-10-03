# Conectar un receptor real

La web es estática. No lleva secretos, backend inventado, correo falso ni un envío simulado. Sin `PUBLIC_FORM_ENDPOINT`, muestra “El envío no está disponible todavía. No se ha enviado tu solicitud. Tus datos siguen aquí.” después de validar. La selección y los valores se conservan al avanzar/volver mientras la página sigue abierta.

## Contrato HTTP

Configurar una URL HTTPS en `PUBLIC_FORM_ENDPOINT`. Puede ser una función del hosting o un servicio propio. El servicio debe recibir y persistir/entregar la solicitud antes de responder con recepción positiva. No enviar secretos en las variables `PUBLIC_`.

`POST` JSON, sin cookies (`credentials: omit`). Para otro dominio, permitir CORS del dominio del sitio y el encabezado `Content-Type`; aceptar el preflight `OPTIONS`. Los secretos y el destinatario se guardan únicamente en el servicio.

Cotización:

```json
{
  "kind": "quote",
  "selection": "equipo:parrilla-a-carbon",
  "selectionLabel": "Parrilla a carbón",
  "date": "YYYY-MM-DD",
  "zone": "zona indicada por el usuario",
  "guests": null,
  "name": "nombre indicado por el usuario",
  "phone": "+prefijo y número",
  "email": null,
  "message": null
}
```

Contacto usa `kind: contact`, los campos de contacto, mensaje obligatorio y zona opcional. No incluye fecha ni selección. El servicio debe validar los datos de nuevo, limitar tamaño/frecuencia, aplicar controles antiabuso y definir protección y conservación de datos con el responsable.

Respuesta 2xx **únicamente tras recepción efectiva**:

```json
{ "received": true, "submissionId": "identificador real del servicio" }
```

Un 2xx sin estos campos, `received: false`, fallo HTTP, red o timeout se considera recepción no confirmada. Tiempo de espera: 15 segundos. El botón “Enviando…” bloquea duplicados mientras espera. Los datos permanecen para corregir/reintentar. El receptor debe aplicar idempotencia o deduplicación propia para los casos de respuesta perdida.

## Confirmación

Solo tras recibir el acuse válido, el cliente guarda temporalmente en `sessionStorage` una marca de navegación con selección, fecha y zona, sin nombre, teléfono, correo ni observaciones, y abre `/solicitud-recibida/`. Dura como máximo 30 minutos. No es una prueba de reserva ni una validación de seguridad del servidor. Si no existe esa marca, la ruta muestra que no hay recepción confirmada en la sesión. No hay folios ni plazos de respuesta inventados.

En caso de que el navegador no permita `sessionStorage`, el formulario muestra el acuse real en la misma página, en vez de simular navegación exitosa. `/demo/estados/` permite revisar visualmente éxito y otros estados solo en desarrollo; no se genera en `dist/`.

WhatsApp es opcional: solo se muestra “Continuar en WhatsApp” si hay un teléfono verificado en `PUBLIC_WHATSAPP_PHONE`. Abrirlo no muestra éxito y no equivale a recepción. Se abre sin transferir automáticamente los datos del formulario.

## Probar antes de publicar

Usar datos de prueba identificados y un receptor de pruebas. Verificar recepción en el sistema receptor, respuesta 2xx con acuse, errores del receptor, falta de acuse, timeout, doble clic, valores conservados y ambos tipos de solicitud. Repetir en el dominio público después del despliegue. Sin destinatario y servicio reales, esta parte no se puede certificar como operativa para clientes.
