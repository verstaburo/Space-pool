/* eslint-disable no-use-before-define */
import SearchFilter from './SearchFIlter';

const { $ } = window;

export default function filterMenu() {
  function searchFilterInit(el) {
    const filter = new SearchFilter(el);
    filter.init();
  }

  window.globalFunctions.searchFilterInit = searchFilterInit;

  const filters = $('[data-nd-filter]');

  if (filters.length > 0) {
    $(filters).each((i, el) => {
      searchFilterInit(el);
    });
  }
}
/* eslint-enable no-use-before-define */
