import anime from 'animejs';

const $ = window.$;

export default function deleteObject() {
  // deleting an object with an animated content shift
  $(document).on('click', '.js-delete-object', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('[data-deleted-object]');
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
  });
}
