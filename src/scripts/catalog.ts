const catalog = document.querySelector<HTMLElement>('[data-catalog]');
if (catalog) {
  const input = document.querySelector<HTMLInputElement>('#buscar')!;
  const order = document.querySelector<HTMLSelectElement>('#catalog-order')!;
  const grid = document.querySelector<HTMLElement>('#catalog-grid')!;
  const wrappers = [...grid.querySelectorAll<HTMLElement>('[data-catalog-wrapper]')];
  const empty = document.querySelector<HTMLElement>('#catalog-empty')!;
  const count = document.querySelector<HTMLElement>('#result-count')!;
  const chips = document.querySelector<HTMLElement>('#active-filters')!;
  const panel = document.querySelector<HTMLDialogElement>('#catalog-filters')!;
  let category = catalog.dataset.initialCategory || '';
  input.value = new URLSearchParams(location.search).get('q') || '';
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  function clear() { category = ''; input.value = ''; order.value = 'az'; update(); }
  function chip(label: string, action: () => void) {
    const button = document.createElement('button'); button.type = 'button'; button.textContent = `${label} ×`;
    button.setAttribute('aria-label', `Quitar filtro: ${label}`); button.addEventListener('click', action); chips.append(button);
  }
  function update() {
    const query = normalize(input.value.trim()); let visible = 0;
    wrappers.sort((a,b) => {
      const result = a.querySelector<HTMLElement>('[data-catalog-item]')!.dataset.name!.localeCompare(b.querySelector<HTMLElement>('[data-catalog-item]')!.dataset.name!, 'es');
      return order.value === 'za' ? -result : result;
    }).forEach(wrapper => {
      const item = wrapper.querySelector<HTMLElement>('[data-catalog-item]')!;
      wrapper.hidden = (!!category && item.dataset.category !== category) || !normalize(item.dataset.search || '').includes(query);
      if (!wrapper.hidden) visible++;
      grid.append(wrapper);
    });
    count.textContent = `${visible} ${visible === 1 ? 'opción de equipo' : 'opciones de equipo'}`;
    empty.hidden = visible > 0; grid.hidden = visible === 0;
    chips.replaceChildren();
    if (category) chip(category.charAt(0).toUpperCase() + category.slice(1), () => {category = ''; update();});
    if (query) chip(`Búsqueda: ${input.value.trim()}`, () => {input.value = ''; update(); input.focus();});
    document.querySelectorAll<HTMLInputElement>('[name="filter-category"]').forEach(r => r.checked = r.value === category);
    if (query) document.querySelector('meta[name="robots"]')?.setAttribute('content','noindex, follow');
  }
  input.addEventListener('input', update); order.addEventListener('change', update);
  document.querySelectorAll('[data-clear-catalog]').forEach(b => b.addEventListener('click', clear));
  document.querySelector('#apply-filters')!.addEventListener('click', () => {category = document.querySelector<HTMLInputElement>('[name="filter-category"]:checked')?.value || ''; update(); panel.close();});
  document.querySelector('#reset-panel')!.addEventListener('click', () => {document.querySelectorAll<HTMLInputElement>('[name="filter-category"]').forEach(r => r.checked = r.value === '');});
  update();
}
