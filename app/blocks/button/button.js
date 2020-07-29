const $ = window.$;

export default function buttonHover() {
  $(document).on('mousemove', '.nd-button', (evt) => {
    const self = evt.currentTarget;
    const selfX = self.getBoundingClientRect().left;
    const mouseX = evt.clientX;
    const width = self.offsetWidth;
    const innerX = mouseX - selfX;
    const persentShift = (innerX / width) * 100;
    self.style.setProperty('background-position', `${persentShift}% 50%`);
  });

  $(document).on('touchmove', '.nd-button', (evt) => {
    const self = evt.currentTarget;
    const selfX = self.getBoundingClientRect().left;
    const mouseX = evt.touches[0].clientX;
    const width = self.offsetWidth;
    const innerX = mouseX - selfX;
    const persentShift = (innerX / width) * 100;
    self.style.setProperty('background-position', `${persentShift}% 50%`);
  });
}
