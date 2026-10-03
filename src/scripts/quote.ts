import { field, value, validate, localDate, sendRequest, contactPayload } from './forms';
const form = document.querySelector<HTMLFormElement>('#quote-form');
if (form) {
  const status = document.querySelector<HTMLElement>('#quote-status')!;
  const selection = field(form,'selection') as HTMLSelectElement;
  const date = field(form,'date') as HTMLInputElement;
  date.min = localDate();
  const query = new URLSearchParams(location.search);
  const requested = query.has('equipo') ? `equipo:${query.get('equipo')}` : query.has('paquete') ? `paquete:${query.get('paquete')}` : '';
  if ([...selection.options].some(o => o.value === requested)) selection.value = requested;
  let current = 1;
  function summary() {
    document.querySelector('#summary-selection')!.textContent = selection.selectedOptions[0]?.text || 'Necesito orientación';
    document.querySelector('#summary-date')!.textContent = value(form!,'date') ? new Intl.DateTimeFormat('es',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value(form!,'date')}T12:00:00`)) : 'Por definir';
    document.querySelector('#summary-zone')!.textContent = value(form!,'zone') || 'Por definir';
    const guests = field(form!,'guests') as HTMLInputElement;
    document.querySelector('#summary-guests')!.textContent = guests.disabled || !guests.value ? 'Aún no lo sé' : guests.value;
    const photo = document.querySelector<HTMLImageElement>('.summary-photo img')!;
    const image = selection.selectedOptions[0]?.dataset.image || 'hero';
    photo.src = `/images/${image}-960.webp`; photo.srcset = `/images/${image}-480.webp 480w, /images/${image}-960.webp 960w, /images/${image}-1440.webp 1440w`; photo.alt = `Imagen ilustrativa: ${selection.selectedOptions[0]?.text || 'reunión al aire libre'}`;
  }
  function go(step: number) {
    current = step;
    form!.querySelectorAll<HTMLElement>('[data-form-step]').forEach(s => s.hidden = Number(s.dataset.formStep) !== step);
    document.querySelectorAll<HTMLElement>('[data-step-indicator]').forEach(s => {const n=Number(s.dataset.stepIndicator); if(n === step)s.setAttribute('aria-current','step'); else s.removeAttribute('aria-current'); s.classList.toggle('is-done',n<step);});
    (document.querySelector('#edit-summary') as HTMLElement).hidden = step === 1;
    status.textContent = ''; summary(); document.querySelector<HTMLElement>(`#step-${step}-title`)!.focus();
  }
  const eventFields = ['date','zone','guests']; const contactFields = ['name','prefix','phone','email','message'];
  document.querySelector('#next-step')!.addEventListener('click', () => {if(validate(form!,eventFields,status))go(2);});
  document.querySelector('#previous-step')!.addEventListener('click', () => go(1));
  document.querySelector('#edit-summary')!.addEventListener('click', () => go(1));
  form.addEventListener('input',summary);
  document.querySelector('#unknown-guests')!.addEventListener('change',event => {const guests=field(form!,'guests') as HTMLInputElement;guests.disabled=(event.target as HTMLInputElement).checked; guests.setAttribute('aria-invalid','false');document.querySelector('#guests-error')!.textContent='';summary();});
  form.addEventListener('submit',async event => {
    event.preventDefault();
    if(current === 1) {if(validate(form!,eventFields,status))go(2);return;}
    if(!validate(form!,eventFields,status)){go(1);validate(form!,eventFields,status);return;}
    if(!validate(form!,contactFields,status))return;
    const guests = field(form!,'guests') as HTMLInputElement;
    await sendRequest(form!,{kind:'quote',selection:selection.value,selectionLabel:selection.selectedOptions[0]?.text || '',date:value(form!,'date'),zone:value(form!,'zone'),guests:guests.disabled || !guests.value ? null : Number(guests.value),...contactPayload(form!)},status);
  });
  summary();
}
