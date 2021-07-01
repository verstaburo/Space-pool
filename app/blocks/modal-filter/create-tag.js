export default function createTag(data) {
  const element = document.createElement('div');
  const innerWrapper = document.createElement('div');
  const removeEl = document.createElement('button');
  const textEl = document.createElement('span');
  const { id } = data;
  const { text } = data;

  element.classList.add('modal-filter-option');
  innerWrapper.classList.add('modal-filter-option__wrapper');
  removeEl.classList.add('modal-filter-option__remove');
  element.classList.add('js-modal-filter-remove-tag');
  element.setAttribute('data-modal-filter-target-id', id);
  textEl.classList.add('modal-filter-option__text');
  textEl.setAttribute('data-modal-filter-tag-text', 'data-modal-filter-tag-text');
  textEl.innerText = text;
  innerWrapper.append(removeEl);
  innerWrapper.append(textEl);
  element.append(innerWrapper);
  return element;
}
