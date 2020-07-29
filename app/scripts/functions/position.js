const $ = window.$;

export default function positioning() {
  function itemPositioning(el, isNoYShift) {
    const self = el[0] ? el[0] : el;
    self.style.setProperty('left', '');
    self.style.setProperty('top', '');
    if (self && getComputedStyle(self).position === 'absolute') {
      const selfGeometry = self.getBoundingClientRect();
      const wW = $(window).width();
      const wH = $(window).height();
      let deltaX = 0;
      let deltaY = 0;

      if (selfGeometry.right > wW) {
        deltaX = wW - selfGeometry.right - 10;
      }

      if (selfGeometry.bottom > wH) {
        deltaY = wH - selfGeometry.bottom - 60;
      }

      self.style.setProperty('left', `${deltaX}px`);
      if (!isNoYShift) {
        self.style.setProperty('top', `calc(100% + ${deltaY}px)`);
      }
    }
  }

  window.globalFunctions.itemPositioning = itemPositioning;
}
