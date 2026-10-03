export const categories = [
  { slug: 'parrillas', name: 'Parrillas', title: 'Parrillas para alquilar', description: 'Una parrilla al aire libre empieza con una buena elección. Consulta el equipo, sus medidas y los accesorios para tu reunión.', image: 'parrilla', hint: 'Para compartir al aire libre', icon: 'grill' },
  { slug: 'cilindros', name: 'Cilindros', title: 'Cilindros para cocinar', description: 'Explora una alternativa para cocinar o ahumar. Consulta el funcionamiento y las características del equipo antes de elegir.', image: 'cilindro', hint: 'Para cocinar y ahumar', icon: 'flame' },
  { slug: 'accesorios', name: 'Accesorios', title: 'Accesorios para tu parrilla', description: 'Los pequeños detalles también cuentan. Consulta los utensilios que pueden acompañar el equipo que elijas.', image: 'utensilios', hint: 'Detalles que acompañan', icon: 'utensils' },
] as const;
export type CategorySlug = typeof categories[number]['slug'];
export interface Equipment {
  slug: string; name: string; category: CategorySlug; type: string; description: string;
  short: string; image: string; alt: string; dimensions: null; capacity: null; price: null;
  verified: false; questions: string[];
}
export const equipment: Equipment[] = [
  { slug: 'parrilla-a-carbon', name: 'Parrilla a carbón', category: 'parrillas', type: 'A carbón',
    short: 'Una opción para preparar y compartir al aire libre.',
    description: 'Una opción para preparar tu parrilla al aire libre. Consulta las medidas y accesorios disponibles para elegir el equipo que mejor se adapte a tu evento.',
    image: 'parrilla', alt: 'Imagen conceptual de una parrilla a carbón negra con rejilla y mesa lateral en un jardín',
    dimensions: null, capacity: null, price: null, verified: false,
    questions: ['Medidas y espacio necesario', 'Accesorios que acompañan el alquiler', 'Condiciones de uso y devolución'] },
  { slug: 'cilindro-para-cocinar', name: 'Cilindro para cocinar', category: 'cilindros', type: 'Cocción y ahumado',
    short: 'Una alternativa para explorar distintas preparaciones.',
    description: 'Consulta este tipo de equipo para cocinar o ahumar en tu próxima reunión. Te recomendamos confirmar el funcionamiento, las medidas y los accesorios antes de elegir.',
    image: 'cilindro', alt: 'Imagen conceptual de un cilindro negro para cocinar y ahumar con tapa y patas en un jardín',
    dimensions: null, capacity: null, price: null, verified: false,
    questions: ['Funcionamiento y tipo de preparación', 'Medidas y espacio necesario', 'Accesorios y condiciones de uso'] },
  { slug: 'set-de-utensilios', name: 'Set de utensilios', category: 'accesorios', type: 'Utensilios',
    short: 'Complementos para acompañar la preparación de tu parrilla.',
    description: 'Consulta los utensilios que pueden acompañar tu parrilla o cilindro para cocinar. La composición del set se confirmará en la propuesta de alquiler.',
    image: 'utensilios', alt: 'Imagen conceptual de pinzas, espátula y tenedor para parrilla con mangos de madera',
    dimensions: null, capacity: null, price: null, verified: false,
    questions: ['Composición del set', 'Compatibilidad con el equipo elegido', 'Condiciones de devolución'] },
];
export const packages = [
  { slug: 'esencial', name: 'Esencial', description: 'Lo necesario para comenzar una parrilla entre amigos.', detail: 'Una propuesta sencilla para empezar. Consulta esta combinación de parrilla y utensilios, y cuéntanos qué necesitas para tu reunión.', items: ['1 parrilla', 'Set básico de utensilios'], equipment: ['parrilla-a-carbon', 'set-de-utensilios'], image: 'parrilla', focus: 'El punto de partida', price: null, verified: false },
  { slug: 'familiar', name: 'Familiar', description: 'Organiza una reunión con espacio para compartir.', detail: 'Más comodidad para compartir. Consulta esta combinación de parrilla, utensilios y mesa de apoyo para tu próxima reunión.', items: ['1 parrilla', 'Utensilios', 'Mesa de apoyo, sujeta a confirmación'], equipment: ['parrilla-a-carbon', 'set-de-utensilios'], image: 'hero', focus: 'Un momento juntos', price: null, verified: false },
  { slug: 'celebracion', name: 'Celebración', description: 'Combina equipos para una ocasión especial.', detail: 'Una propuesta para combinar distintas preparaciones. Consulta la parrilla, el cilindro para cocinar y los utensilios, y ajustemos los detalles a tu evento.', items: ['1 parrilla', '1 cilindro para cocinar', 'Utensilios'], equipment: ['parrilla-a-carbon', 'cilindro-para-cocinar', 'set-de-utensilios'], image: 'hero', focus: 'Más formas de compartir', price: null, verified: false },
] as const;
export const faqs = [
  { question: '¿Cómo solicito una cotización?', answer: 'Elige un equipo o paquete y completa los datos de tu reunión. También puedes seleccionar “Necesito orientación” para consultar qué opción se adapta a lo que estás organizando.' },
  { question: '¿La solicitud confirma mi reserva?', answer: 'No. Primero se deben confirmar disponibilidad y condiciones. La reserva se confirma al acordar los detalles de tu alquiler.' },
  { question: '¿Qué incluye el alquiler?', answer: 'Depende del equipo o paquete elegido. Al cotizar se indicarán los elementos incluidos y los complementos opcionales. El carbón y la limpieza se consultan por separado.' },
  { question: '¿Realizan entrega y recogida?', answer: 'Indícanos la zona de tu evento para consultar las opciones de traslado y su costo. La cobertura y las condiciones se confirman al cotizar.' },
  { question: '¿Puedo personalizar un paquete?', answer: 'Cuéntanos qué necesitas en las observaciones. Se revisarán los equipos y accesorios que se puedan combinar.' },
  { question: '¿Con cuánta anticipación debo consultar?', answer: 'Consulta cuando tengas una fecha prevista para tu reunión. La disponibilidad deberá confirmarse para esa fecha; no hay un plazo de reserva establecido en esta propuesta.' },
];
export const steps = [
  { name: 'Elige', text: 'Explora equipos y paquetes. Encuentra una opción para tu reunión.', icon: 'grill', href: '/equipos/', link: 'Explorar equipos' },
  { name: 'Consulta', text: 'Cuéntanos cuándo, dónde y qué necesitas para preparar tu propuesta.', icon: 'message', href: '/cotizar/', link: 'Contar los detalles' },
  { name: 'Coordina', text: 'Confirma disponibilidad, condiciones y opciones de traslado antes de reservar.', icon: 'calendar', href: '/preguntas-frecuentes/', link: 'Resolver tus dudas' },
];
