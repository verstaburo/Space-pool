/* eslint-disable no-use-before-define */
import SearchFilter from './SearchFIlter';

const $ = window.$;

export default function filterMenu() {
  const filters = $('[data-nd-filter]');

  if (filters.length > 0) {
    $(filters).each((i, el) => {
      const filter = new SearchFilter(el);
      filter.init();
    });
  }
}
/* eslint-enable no-use-before-define */
