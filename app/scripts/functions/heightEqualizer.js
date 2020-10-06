import {
  ResizeObserver,
} from '@juggle/resize-observer';

export default function heightEqualizer() {
  function resetHeight() {
    const targets = document.querySelectorAll('[data-equalizer-target]');
    if (targets) {
      targets.forEach((el) => {
        const tar = el;
        tar.style.height = '';
      });
    }
  }

  function getUnique(arr) {
    return arr.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]));
  }

  function getMaxHeight(arr) {
    const heights = [];
    arr.forEach((el) => {
      heights.push(el.offsetHeight);
    });
    return Math.max.apply(null, heights);
  }

  function setEqualizerHeight() {
    const targets = document.querySelectorAll('[data-equalizer-target]');
    const len = targets.length;
    if (len) {
      resetHeight();
      const names = [];
      targets.forEach((el) => {
        names.push(el.getAttribute('data-equalizer-target'));
      });
      const groups = [].concat(getUnique(names));
      const sets = [];
      groups.forEach((el) => {
        sets.push(document.querySelectorAll(`[data-equalizer-target=${el}]`));
      });
      sets.forEach((arr) => {
        const maxH = getMaxHeight(arr);
        arr.forEach((el) => {
          const tar = el;
          tar.style.height = `${maxH}px`;
        });
      });
    }
  }

  function setObserversForEqualizerTarget() {
    const targets = document.querySelector('body');
    const sectionsSizesWatch = new ResizeObserver(() => {
      setEqualizerHeight();
    });

    sectionsSizesWatch.observe(targets);
  }

  setEqualizerHeight();
  setObserversForEqualizerTarget();
}
