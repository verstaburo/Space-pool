/* eslint-disable no-unused-vars */
import moment from 'moment';
import IMask from 'imask';

const { $ } = window;

// маскирование
export default function maskForm() {
  $(document).on('focus', '[data-birthday]', (evt) => {
    const _this = evt.currentTarget;
    const momentFormat = 'YYYY / MM / DD';
    // const maskPattern = 'YYYY / M[M] / D[D]';
    if (!_this.masked) {
      const momentMask = IMask(_this, {
        mask: Date,
        pattern: momentFormat,
        lazy: false,
        min: new Date(1900, 0, 1),
        max: new Date(3000, 0, 1),
        autofix: true,
        overwrite: true,
        format(date) {
          return moment(date).format(momentFormat);
        },
        parse(str) {
          return moment(str, momentFormat);
        },
        blocks: {
          YYYY: {
            mask: IMask.MaskedRange,
            placeholderChar: 'Y',
            from: 1900,
            to: 2999,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            placeholderChar: 'M',
            maxLength: 2,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
            placeholderChar: 'D',
            maxLength: 2,
          },
        },
      });
      _this.masked = true;
    }
  });

  $(document).on('focus', '[data-tel-code]', (evt) => {
    const _this = evt.currentTarget;
    if (!_this.masked) {
      const momentMask = IMask(_this, {
        mask: '+00',
        pattern: '+[0]0',
        lazy: true,
      });
      _this.masked = true;
    }
  });

  $(document).on('focus', '[data-tel-number]', (evt) => {
    const _this = evt.currentTarget;
    if (!_this.masked) {
      const momentMask = IMask(_this, {
        mask: '+0[00]0000000000[0]',
        lazy: true,
      });
      _this.masked = true;
    }
  });
}
/* eslint-enable no-unused-vars */
