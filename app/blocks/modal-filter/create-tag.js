export default function createTag(data) {
  const element = document.createElement('div');
  const innerWrapper = document.createElement('div');
  const closeEl = document.createElement('button');
  const textEl = document.createElement('span');
  const { uid } = data;
  const { text } = data;

  element.classList.add('modal-filter-option');
  innerWrapper.classList.add('modal-filter-option__wrapper');
  closeEl.classList.add('modal-filter-option__close');
  closeEl.classList.add('js-close-modal-filter');
  closeEl.setAttribute('data-modal-filter-source', uid);
  textEl.classList.add('modal-filter-option__text');
  textEl.innerText = text;
  innerWrapper.append(closeEl);
  innerWrapper.append(textEl);
  element.append(innerWrapper);
  return element;
}
