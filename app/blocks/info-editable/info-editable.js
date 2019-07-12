const $ = window.$;

export default function infoEditable() {
  $(document).on('click', '.js-field-edit', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const editFieldData = $(self).attr('data-edit-target');
    const editField = $(`[data-field-edit="${editFieldData}"]`);
    $(editField).attr('contenteditable', 'true');
    $(editField)[0].focus();
  });

  $(document).on('keydown', '[data-field-edit]', (evt) => {
    evt.stopPropagation();
    const self = evt.currentTarget;
    const fieldData = $(self).attr('data-field-edit');
    const copyfield = $(`[data-field-copy="${fieldData}"]`);
    const key = evt.which;
    if (key === 13) {
      $(self).removeAttr('contenteditable');
      $(copyfield).val($(self).text());
    }
  });

  $(document).on('change', '[data-field-edit]', (evt) => {
    const self = evt.currentTarget;
    const fieldData = $(self).attr('data-field-edit');
    const copyfield = $(`[data-field-copy="${fieldData}"]`);
    $(copyfield).val($(self).text());
  });

  $(document).on('blur', '[data-field-edit]', (evt) => {
    const self = evt.currentTarget;
    const fieldData = $(self).attr('data-field-edit');
    const copyfield = $(`[data-field-copy="${fieldData}"]`);
    $(copyfield).val($(self).text());
    $(self).removeAttr('contenteditable');
  });
}
