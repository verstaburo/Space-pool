// https://www.jacklmoore.com/autosize/
import autosize from 'autosize';

const { $ } = window;

// автосайз для textarea
export default function textareaAutosize() {
  function autosizeAll(elements) {
    const el = elements || $('.textarea, .nd-textarea, .messenger__field').not('.no-sm-autosize');
    autosize(el);
  }

  function smnoAutosize() {
    if (window.Modernizr.mq(`(max-width: ${window.globalOptions.sizes.sm - 1}px)`)) {
      autosize.destroy($('.textarea.no-sm-autosize, .nd-textarea.no-sm-autosize'));
    } else {
      autosize($('.textarea.no-sm-autosize, .nd-textarea.no-sm-autosize'));
    }
  }

  autosizeAll();
  smnoAutosize();

  window.autosizeTextarea = autosizeAll;

  $(window).on('resize', smnoAutosize);
}
