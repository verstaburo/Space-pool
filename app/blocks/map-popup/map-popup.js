export default function mapPopup() {
  function generateMapPopup(data) {
    const base = document.createElement('div');
    base.classList.add('map-popup');
    const baseContent = document.createElement('div');
    baseContent.classList.add('map-popup__content');

    if (data.gallery) {
      const media = document.createElement('div');
      media.classList.add('map-popup__media');
      if (data.gallery) {
        const gallery = document.createElement('div');
        gallery.classList.add('gallery');
        const slider = document.createElement('div');
        slider.classList.add('gallery__slider');
        slider.classList.add('js-gallery-container');
        const sliderWrapper = document.createElement('div');
        sliderWrapper.classList.add('gallery__wrapper');
        data.gallery.forEach((el) => {
          const slide = document.createElement('a');
          slide.classList.add('gallery__slide');
          slide.setAttribute('href', data.href);
          const image = document.createElement('picture');
          image.classList.add('gallery__image');
          el.forEach((srs) => {
            const sourceEl = document.createElement('source');
            if (srs.srcset) {
              sourceEl.srcset = srs.srcset;
            }
            if (srs.type) {
              sourceEl.type = srs.type;
            }
            if (srs.sizes) {
              sourceEl.sizes = srs.sizes;
            }
            if (srs.media) {
              sourceEl.media = srs.media;
            }
            image.appendChild(sourceEl);
            if (srs.default) {
              const imageImg = document.createElement('img');
              imageImg.srcset = srs.srcset;
              image.appendChild(imageImg);
            }
          });
          slide.appendChild(image);
          sliderWrapper.appendChild(slide);
        });
        slider.appendChild(sliderWrapper);
        const buttons = document.createElement('div');
        buttons.classList.add('gallery__buttons');
        buttons.classList.add('gallery__buttons_small');
        const buttonPrev = document.createElement('div');
        buttonPrev.classList.add('gallery__button');
        buttonPrev.classList.add('gallery__button_prev');
        buttonPrev.classList.add('js-gallery-button-prev');
        const buttonNext = document.createElement('div');
        buttonNext.classList.add('gallery__button');
        buttonNext.classList.add('gallery__button_next');
        buttonNext.classList.add('js-gallery-button-next');
        const ns = 'http://www.w3.org/2000/svg';
        const arrow = document.createElementNS(ns, 'svg');
        arrow.setAttributeNS(null, 'viewBox', '0 0 11 26');
        const arrowPath = document.createElementNS(ns, 'path');
        arrowPath.setAttributeNS(null, 'fill-rule', 'evenodd');
        arrowPath.setAttributeNS(null, 'clip-rule', 'evenodd');
        arrowPath.setAttributeNS(null, 'd', 'M8.76415 1.03693C9.07957 0.617804 9.67504 0.53373 10.0942 0.849149C10.5133 1.16457 10.5974 1.76003 10.2819 2.17916L2.13861 13L10.2822 23.8212C10.5976 24.2404 10.5135 24.8358 10.0944 25.1512C9.67529 25.4667 9.07982 25.3826 8.7644 24.9635L0.208823 13.5948C-0.0380478 13.2876 -0.0719481 12.851 0.138376 12.5064C0.156503 12.4766 0.176376 12.4476 0.19797 12.4197L8.76415 1.03693Z');
        arrowPath.setAttributeNS(null, 'fill-opacity', '0.71');
        arrowPath.setAttributeNS(null, 'fill', '#d8ddde');
        arrow.appendChild(arrowPath);
        const arrow2 = arrow.cloneNode(true);
        buttonNext.appendChild(arrow);
        buttonPrev.appendChild(arrow2);
        buttons.appendChild(buttonPrev);
        buttons.appendChild(buttonNext);
        gallery.appendChild(slider);
        gallery.appendChild(buttons);
        base.appendChild(gallery);
        window.globalFunctions.gallerySliderInit(gallery);
      }
    }

    if (data.title) {
      const title = document.createElement('a');
      title.classList.add('map-popup__title');
      title.setAttribute('href', data.href);
      title.innerText = data.title;
      baseContent.appendChild(title);
    }
    if (data.colorBoxes) {
      const boxes = document.createElement('div');
      boxes.classList.add('map-popup__boxes');
      data.colorBoxes.forEach((el) => {
        const box = document.createElement('div');
        box.classList.add('nd-box');
        box.classList.add('nd-box_size6');
        box.classList.add(`nd-box_${el}`);
        boxes.appendChild(box);
      });
      baseContent.appendChild(boxes);
    }
    base.appendChild(baseContent);
    return base;
  }

  window.globalFunctions.generateMapPopup = generateMapPopup;
}
