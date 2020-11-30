import anime from 'animejs';

const { $ } = window;

export default function tip() {
  // close tip
  $(document).on('click', '.js-close-tip', (evt) => {
    evt.preventDefault();
    const self = $(evt.target).closest('.tip');
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
          $(self).hide(0, () => {
            $(self).css({
              height: '',
            });
          });
        },
      });
  });
}
