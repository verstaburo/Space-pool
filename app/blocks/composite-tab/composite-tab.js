const $ = window.$;

export default function compositeTab() {
  const compositeTabs = {
    activeEl(activator) {
      const element = $(activator).closest('[data-composite-el]');
      $(element).removeClass('is-disabled');
    },
    disableEl(activator) {
      const element = $(activator).closest('[data-composite-el]');
      $(element).addClass('is-disabled');
    },
    saveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).addClass('is-saved');
    },
    unsaveEl(compositeName) {
      const element = $(`[data-composite-el="${compositeName}"]`);
      $(element).addClass('is-saved');
    },
    open(activator) {
      const el = activator;
      const compositeName = $(el).attr('data-composite-el');
      const target = $(`[data-composite-target*="${compositeName}"]`);
      $(el).addClass('is-active');
      $(target).addClass('is-active is-opened');
    },
    close(activator) {
      const elements = activator || $('[data-composite-el]');
      let targets;
      if (activator) {
        targets = $(activator).map((i, el) => {
          const compositeName = $(el).attr('data-composite-el');
          return $(`[data-composite-target*="${compositeName}"]`);
        });
      } else {
        targets = $('[data-composite-target]');
      }
      $(elements).removeClass('is-active');
      $(targets).each((i, el) => {
        $(el).removeClass('is-active is-opened');
      });
    },
  };

  // активируем переключатели вкладок
  $(document).on('change', '[data-composite-activator]', (evt) => {
    const self = evt.currentTarget;
    const selfButton = $(self).closest('[data-composite-el]');
    if ($(self).prop('checked')) {
      compositeTabs.activeEl(self);
      compositeTabs.close();
      compositeTabs.open(selfButton);
    } else if ($(selfButton).is('.is-active')) {
      compositeTabs.disableEl(self);
      compositeTabs.close();
    } else {
      compositeTabs.disableEl(self);
    }
  });

  // переключаем вкладки
  $(document).on('click', '[data-composite-el]', (evt) => {
    const source = evt.target;
    const isChecked = $(source).is('[data-composite-checkbox]') || $(source).closest('[data-composite-checkbox]').length > 0;
    const self = evt.currentTarget;
    if (!$(self).is('.is-disabled') && !isChecked) {
      const notactive = $('[data-composite-el]').not(self);
      compositeTabs.close(notactive);
      compositeTabs.open(self);
    }
  });

  // закрываем вклаюку по крестику
  $(document).on('click', '.js-close-form-modal', () => {
    compositeTabs.close();
  });
}
