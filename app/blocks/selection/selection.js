import Selection from './SelectionClass';

export default function selection() {
  function searchSelections(rec) {
    if (rec.type === 'childList') {
      const addedNodesList = rec.addedNodes;
      if (addedNodesList.length) {
        const selections = addedNodesList.filter((el) => el.classList.contain('.selection'));
        selections.forEach((el) => {
          if (!el.selection) {
            const newSelection = new Selection(el);
            newSelection.init();
          }
        });
      }
    }
  }

  const bodyElement = document.querySelector('body');
  const observer = new MutationObserver(searchSelections);
  observer.observe(bodyElement, {
    childList: true,
    subtree: true,
  });

  const selectionsElements = document.querySelectorAll('.selection');
  if (selectionsElements.length) {
    selectionsElements.forEach((el) => {
      if (!el.selection) {
        const newSelection = new Selection(el);
        newSelection.init();
      }
    });
  }
}
