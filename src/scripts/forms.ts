export type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export function localDate() {
  const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function field(form: HTMLFormElement, name: string): FormField { return form.elements.namedItem(name) as FormField; }
export function value(form: HTMLFormElement, name: string) { return field(form,name)?.value.trim() || ''; }
export function validate(form: HTMLFormElement, names: string[], status: HTMLElement) {
  let first: FormField | null = null;
  for (const name of names) {
    const input = field(form,name); if (!input) continue;
    const val = input.value.trim(); let error = '';
    if (!input.disabled) {
      if (input.required && !val) error = ({ date:'Elige una fecha para continuar.', zone:'Indica dónde será tu reunión.', name:'Escribe tu nombre.', prefix:'Añade el prefijo de tu país.', phone:'Revisa el número de contacto.', message:'Cuéntanos cuál es tu consulta.' } as Record<string,string>)[name] || 'Completa este campo.';
      else if (name === 'date' && val && (!/^\d{4}-\d{2}-\d{2}$/.test(val) || val < localDate() || Number.isNaN(Date.parse(val)))) error = 'Elige una fecha válida a partir de hoy.';
      else if (name === 'guests' && val && (!Number.isSafeInteger(Number(val)) || Number(val) <= 0)) error = 'Escribe un número entero positivo o elige “Aún no lo sé”.';
      else if (name === 'guests' && (input as HTMLInputElement).validity.badInput) error = 'Escribe un número entero positivo.';
      else if (name === 'prefix' && val && !/^\+?[1-9]\d{0,3}$/.test(val)) error = 'Revisa el prefijo internacional de tu país.';
      else if (name === 'phone' && val && (!/^[\d\s().-]+$/.test(val) || !/\d/.test(val) || (val.replace(/\D/g,'') + value(form,'prefix').replace(/\D/g,'')).length > 15)) error = 'Revisa el número de contacto; usa dígitos y tu prefijo de país.';
      else if (name === 'email' && val && (input as HTMLInputElement).validity.typeMismatch) error = 'Revisa el correo electrónico o deja el campo vacío.';
      else if (name === 'message' && val.length > 1000) error = 'El mensaje puede tener hasta 1000 caracteres.';
      else if (input instanceof HTMLInputElement && input.maxLength > 0 && val.length > input.maxLength) error = `Usa como máximo ${input.maxLength} caracteres.`;
    }
    input.setAttribute('aria-invalid', String(!!error));
    const target = document.getElementById(`${name}-error`); if (target) target.textContent = error;
    if (error && !first) first = input;
  }
  if (first) {status.textContent = 'Revisa los campos indicados para continuar.'; first.focus(); return false;}
  status.textContent = ''; return true;
}
interface Receipt { received: true; submissionId: string; }
function whatsappLink(status: HTMLElement, phone: string) {
  if (!/^\d{5,15}$/.test(phone)) return;
  const link = document.createElement('a'); link.href = `https://wa.me/${phone}`; link.textContent = 'Continuar en WhatsApp'; link.target = '_blank'; link.rel = 'noopener'; status.append(link);
}
export async function sendRequest(form: HTMLFormElement, payload: Record<string,unknown>, status: HTMLElement) {
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {status.textContent = 'El envío no está disponible todavía. No se ha enviado tu solicitud. Tus datos siguen aquí.'; whatsappLink(status,form.dataset.whatsapp || ''); return false;}
  const button = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = button.querySelector<HTMLElement>('[data-submit-label]')!;
  if (button.disabled) return false;
  const original = label.textContent; button.disabled = true; label.textContent = 'Enviando…'; form.setAttribute('aria-busy','true'); status.textContent = '';
  try {
    const url = new URL(endpoint, location.origin);
    if (url.protocol !== 'https:' && !(import.meta.env.DEV && ['localhost','127.0.0.1'].includes(url.hostname))) throw new Error('Invalid endpoint');
    const response = await fetch(url, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000),credentials:'omit'});
    const receipt = await response.json() as Receipt;
    if (!response.ok || receipt.received !== true || typeof receipt.submissionId !== 'string' || !receipt.submissionId.trim()) throw new Error('Unconfirmed receipt');
    // This record is written only after acknowledgement by the configured service.
    // It is navigation state, not a booking or proof stored by our frontend.
    const record = { received:true, at:Date.now(), kind:payload.kind, selection:payload.selectionLabel || 'Consulta de contacto', date:payload.date || null, zone:payload.zone || null };
    try {sessionStorage.setItem('grillrent-receipt',JSON.stringify(record));}
    catch {status.textContent = 'El servicio confirmó la recepción de tu solicitud. No pudimos abrir el resumen. La reserva requiere confirmar disponibilidad y condiciones.'; return true;}
    location.assign('/solicitud-recibida/'); return true;
  } catch {
    status.textContent = 'No pudimos confirmar la recepción de tu solicitud. Tus datos siguen aquí. Intenta de nuevo.';
    whatsappLink(status,form.dataset.whatsapp || ''); return false;
  } finally {button.disabled = false; label.textContent = original; form.removeAttribute('aria-busy');}
}
export function contactPayload(form: HTMLFormElement) {
  return { name:value(form,'name'), phone:`+${value(form,'prefix').replace(/\D/g,'')}${value(form,'phone').replace(/\D/g,'')}`, email:value(form,'email') || null, message:value(form,'message') || null };
}
