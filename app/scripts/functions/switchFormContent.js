const $ = window.$;

export default function switchFormContent() {
  function hideAndShow(name) {
    const newElements = $(`[data-form-switchable-item*="${name}"]`);
    const newActiveElements = $(newElements).find('input, textarea, select');
    const allElements = $('[data-form-switchable-item]').not(newElements);
    const allActiveElements = $(allElements).find('input, textarea, select');
    $(allElements).addClass('hide');
    $(allActiveElements).each((i, el) => {
      $(el).attr('disabled', 'disabled');
    });
    $(newElements).removeClass('hide');
    $(newActiveElements).each((i, el) => {
      $(el).removeAttr('disabled');
    });
  }

  function switchElements(sw) {
    const type = $(sw).is('select') ? 'select' : 'input';
    switch (type) {
      case 'select': {
        const option = $(sw).find('option:selected');
        const obj = JSON.parse($(option).attr('data-custom-properties'));
        if (typeof obj === 'object') {
          const name = obj.formSwitch;
          hideAndShow(name);
        }
        break;
      }
      default: {
        const name = $(sw).attr('data-form-switch');
        hideAndShow(name);
        break;
      }
    }
    if ($('[data-checker]').length > 0) {
      $('[data-checker]').not('[disabled]').each((i, checkers) => {
        const checker = checkers;
        window.globalFunctions.changeFormState(checker);
      });
    }
  }

  window.globalFunctions.switchElements = switchElements;

  if ($('[data-form-switch]').length > 0) {
    $('[data-form-switch]').each((i, el) => {
      const type = $(el).is('select') ? 'select' : 'input';
      if (type === 'input') {
        if ($(el).prop('checked')) {
          switchElements(el);
        }
      } else {
        switchElements(el);
      }
    });
  }

  $(document).on('change', '[data-form-switch]', (evt) => {
    const self = evt.currentTarget;
    switchElements(self);
  });
}
