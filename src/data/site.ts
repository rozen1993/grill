const configuredDomain = import.meta.env.PUBLIC_SITE_URL?.trim();
export const business = {
  name: 'GrillRent',
  provisional: true,
  domain: configuredDomain || null,
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT?.trim() || null,
  whatsapp: import.meta.env.PUBLIC_WHATSAPP_PHONE?.trim() || null,
  email: null,
  address: null,
  hours: null,
  city: null,
  country: null,
  currency: null,
  prices: null,
  rentalDuration: null,
  delivery: null,
  deposit: null,
  legalApproved: false,
};
export const navigation = [
  { label: 'Equipos', href: '/equipos/' },
  { label: 'Paquetes', href: '/paquetes/' },
  { label: 'Cómo funciona', href: '/como-funciona/' },
  { label: 'Contacto', href: '/contacto/' },
];
export const extraNavigation = [
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Guías y consejos', href: '/guias/' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes/' },
];
export const publicRoutes = [
  '/', '/equipos/', '/equipos/parrillas/', '/equipos/cilindros/', '/equipos/accesorios/',
  '/equipos/parrilla-a-carbon/', '/equipos/cilindro-para-cocinar/', '/equipos/set-de-utensilios/',
  '/paquetes/', '/paquetes/esencial/', '/paquetes/familiar/', '/paquetes/celebracion/',
  '/cotizar/', '/como-funciona/', '/nosotros/', '/contacto/', '/preguntas-frecuentes/',
  '/guias/', '/guias/como-elegir-parrilla/', '/guias/preparar-tu-reunion/', '/guias/parrilla-o-cilindro/',
];
