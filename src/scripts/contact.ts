import { field, value, validate, sendRequest, contactPayload } from './forms';
const form = document.querySelector<HTMLFormElement>('#contact-form');
if(form){
  const status = document.querySelector<HTMLElement>('#contact-status')!;
  form.addEventListener('submit', async event => {event.preventDefault();if(validate(form,['name','prefix','phone','email','message'],status))await sendRequest(form,{kind:'contact',zone:value(form,'zone') || null,...contactPayload(form)},status);});
  const coverage = document.querySelector<HTMLFormElement>('#coverage-form')!;
  coverage.addEventListener('submit',event => {event.preventDefault();const zone=document.querySelector<HTMLInputElement>('#coverage-zone')!.value.trim();if(!zone)return;field(form,'zone').value=zone;const message=field(form,'message');const question=`Quisiera consultar las opciones de entrega y recogida para ${zone}.`;
    if(!message.value.includes(question))message.value=(message.value?`${message.value}\n\n`:'')+question;
    document.querySelector('#coverage-status')!.textContent='Añadimos la zona a tu consulta. Completa tus datos de contacto para enviarla.';message.focus();});
}
