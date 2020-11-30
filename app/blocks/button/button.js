const { $ } = window;

export default function buttonHover() {
  $(document).on('mousemove', '.nd-button', (evt) => {
    const self = evt.currentTarget;
    const selfX = self.getBoundingClientRect().left;
    const mouseX = evt.clientX;
    const width = self.offsetWidth;
    const innerX = mouseX - selfX;
    const persentShift = 100 - ((innerX / width) * 100);
    self.style.setProperty('--bgpos-x', `${persentShift}%`);
  });

  $(document).on('touchmove', '.nd-button', (evt) => {
    const self = evt.currentTarget;
    const selfX = self.getBoundingClientRect().left;
    const mouseX = evt.touches[0].clientX;
    const width = self.offsetWidth;
    const innerX = mouseX - selfX;
    const persentShift = 100 - ((innerX / width) * 100);
    self.style.setProperty('--bgpos-x', `${persentShift}%`);
  });
}
