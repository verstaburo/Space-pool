export default function offerPanel() {
  function handlerForScrollInWrapper(evt) {
    const wrapper = evt.currentTarget;
    const indicator = wrapper.querySelector('[data-offer-panel-indicator]');
    if (indicator) {
      const indicatorSizes = indicator.getBoundingClientRect();
      const panel = wrapper.parentElement.querySelector('[data-offer-panel]');
      if (panel) {
        if (indicatorSizes.top < 0) {
          panel.classList.add('is-visible');
        } else {
          panel.classList.remove('is-visible');
        }
      }
    }
  }

  function searchWrapper(rec) {
    if (rec.type === 'childList') {
      const addedNodesList = rec.addedNodes;
      if (addedNodesList.length) {
        const selections = addedNodesList.filter((el) => el.classList.contain('.layout__column_start .layout__wrapper'));
        selections.forEach((el) => {
          if (!el.selection) {
            el.addEventListener('scroll', handlerForScrollInWrapper, { passive: true });
          }
        });
      }
    }
  }

  const bodyElement = document.querySelector('body');
  const observer = new MutationObserver(searchWrapper);
  observer.observe(bodyElement, {
    childList: true,
    subtree: true,
  });

  const layoutsElements = document.querySelectorAll('.layout__column_start .layout__wrapper');
  if (layoutsElements.length) {
    layoutsElements.forEach((el) => {
      el.addEventListener('scroll', handlerForScrollInWrapper, { passive: true });
    });
  }
}
