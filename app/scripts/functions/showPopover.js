const { $ } = window;

export default function ShowPopover() {
  function setPosition(parent, popover, place) {
    const wH = document.documentElement.clientHeight;
    const popSizes = popover.getBoundingClientRect();
    const selfSizes = parent.getBoundingClientRect();

    let basePopX = selfSizes.x;
    let basePopY = selfSizes.bottom;

    if (place === 'end') {
      basePopX = (selfSizes.x + selfSizes.width) - popSizes.width;
    }

    if (place === 'middle') {
      basePopX = selfSizes.x + (selfSizes.width - popSizes.width) * 0.5;
    }

    const freeSpaceBottom = wH - (basePopY + popSizes.height);

    if (freeSpaceBottom < 0) {
      basePopY = selfSizes.y - popSizes.height;
    }

    popover.style.setProperty('left', `${basePopX}px`);
    popover.style.setProperty('top', `${basePopY}px`);
  }

  function openPopover(base) {
    const position = base.getAttribute('data-popover-position');
    const { hash } = base;
    const popover = document.querySelector(hash);
    const isOpened = popover.classList.contains('is-opened');

    if (popover && !isOpened) {
      setPosition(base, popover, position);
      popover.classList.add('is-opened');
    } else {
      popover.classList.remove('is-opened');
    }
  }

  window.globalFunctions.setPopoverPosition = setPosition;
  window.globalFunctions.openPopover = openPopover;

  $(document).on('click', '.js-show-popover', (evt) => {
    evt.preventDefault();

    const self = evt.currentTarget;
    const position = self.getAttribute('data-popover-position');
    const { hash } = self;
    const popover = document.querySelector(hash);
    const isOpened = popover.classList.contains('is-opened');

    if (popover && !isOpened) {
      setPosition(self, popover, position);
      popover.classList.add('is-opened');
    } else {
      popover.classList.remove('is-opened');
    }
  });

  // $(document).on('mouseenter', '.js-show-popover', (evt) => {
  //   evt.preventDefault();

  //   const self = evt.currentTarget;
  //   const position = self.getAttribute('data-popover-position');
  //   const { hash } = self;
  //   const popover = document.querySelector(hash);
  //   const isOpened = popover.classList.contains('is-opened');

  //   if (popover && !isOpened) {
  //     setPosition(self, popover, position);
  //     popover.classList.add('is-opened');
  //   }
  // });

  $(document).on('click', (evt) => {
    const _self = evt.target;
    const isPopover = _self.matches('[data-popover]') || _self.closest('[data-popover]');
    const isShareLink = _self.matches('.js-show-popover') || _self.closest('.js-show-popover');
    if (!isPopover && !isShareLink) {
      $('[data-popover]').removeClass('is-opened');
    }
  });
}
