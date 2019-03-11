import webkitLineClamp from 'webkit-line-clamp';

export default function truncateBlocks() {
  function clamp() {
    const blocks = document.querySelectorAll('.js-line-clamp');
    if (blocks.length > 0) {
      blocks.forEach((el) => {
        const maxLines = parseInt(el.getAttribute('data-max-line'), 10) || 2;
        webkitLineClamp(el, maxLines);
      });
    }
  }

  clamp();
  window.addEventListener('resize', clamp, false);
}
