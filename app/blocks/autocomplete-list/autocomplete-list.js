import Autocomplete from './autocomplete';

const $ = window.$;

export default function autocompleteList() {
  $(document).on('focus', '.js-autocomplete', (evt) => {
    const self = evt.currentTarget;
    if (!self.autocmpl) {
      const autocmpl = new Autocomplete(self);
      autocmpl.init();
    }
  });
}
