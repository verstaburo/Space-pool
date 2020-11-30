const { $ } = window;
const bp = window.globalOptions.sizes;

export default function infoEditable() {
  const keyNumbersCode = [8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99,
    100, 101, 102, 103, 104, 105, 110, 190,
  ];
  $(document).on('click', '.js-field-edit', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const editFieldData = $(self).attr('data-edit-target');
    const editField = $(`[data-field-edit="${editFieldData}"]`);
    $(editField).attr('contenteditable', 'true');
    setTimeout(() => {
      $(editField).focus();
    }, 50);
  });

  $(document).on('keydown paste', '[data-field-edit]', (evt) => {
    evt.stopPropagation();
    const self = evt.currentTarget;
    const fieldData = $(self).attr('data-field-edit');
    const maxLength = Number($(self).attr('data-maxlength')) || 0;
    const isNumbers = $(self).attr('data-numbers');
    const copyfield = $(`[data-field-copy="${fieldData}"]`);
    const text = $(self).text();
    const key = evt.which;
    if (key === 13) {
      if (window.Modernizr.mq(`(min-width: ${bp.md}px)`)) {
        $(self).removeAttr('contenteditable');
      }
      $(copyfield).val(text);
    }
    if (maxLength > 0 && text.length === maxLength && key !== 8) {
      evt.preventDefault();
    }

    if (isNumbers !== undefined && !keyNumbersCode.includes(key)) {
      evt.preventDefault();
    }
  });

  // $(document).on('change', '[data-field-edit]', (evt) => {
  //   const self = evt.currentTarget;
  //   const fieldData = $(self).attr('data-field-edit');
  //   const copyfield = $(`[data-field-copy="${fieldData}"]`);
  //   $(copyfield).val($(self).text());
  // });

  $(document).on('blur', '[data-field-edit]', (evt) => {
    const self = evt.currentTarget;
    const fieldData = $(self).attr('data-field-edit');
    const copyfield = $(`[data-field-copy="${fieldData}"]`);
    $(copyfield).val($(self).text());
    if (window.Modernizr.mq(`(min-width: ${bp.md}px)`)) {
      $(self).removeAttr('contenteditable');
    }
  });
}
