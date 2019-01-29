import anime from 'animejs';

const $ = window.$;

export default function deleteObject() {
  // deleting an object with an animated content shift
  $(document).on('click', '.js-delete-object', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('[data-deleted-object]');
    const offers = $(self).closest('.offers');
    const timeline = anime.timeline({
      easing: 'easeInQuad',
      duration: 300,
    });
    timeline
      .add({
        targets: self[0],
        opacity: 0,
      })
      .add({
        targets: self[0],
        height: 0,
        complete() {
          $(self).remove();
          if ($(offers).length) {
            $(offers).trigger('changeOffer');
          }
        },
      });
  });

  $(document).on('click', '.js-delete-object-except-last', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('[data-deleted-object]');
    const group = $(self).parents('[data-deleted-group]');
    const totalElements = $(group).find('[data-deleted-object]').length;
    if (totalElements > 1) {
      const timeline = anime.timeline({
        easing: 'easeInQuad',
        duration: 300,
      });
      timeline
        .add({
          targets: self[0],
          opacity: 0,
        })
        .add({
          targets: self[0],
          height: 0,
          complete() {
            $(self).remove();
          },
        });
    } else {
      $(self).find('input').val('');
      $(self).trigger('input');
    }
  });
}
