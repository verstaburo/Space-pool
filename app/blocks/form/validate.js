/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'parsleyjs';
import moment from 'moment';

const Parsley = window.Parsley;

Parsley.addMessages('en', {
  defaultMessage: 'This value seems to be invalid.',
  type: {
    email: 'Please enter valid E-mail adress',
    url: 'Please enter valid url.',
    number: 'This value should be a valid number.',
    integer: 'This value should be a valid integer.',
    digits: 'This value should be digits.',
    alphanum: 'This value should be alphanumeric.',
  },
  notblank: 'This value should not be blank.',
  required: 'This value is required.',
  pattern: 'This value seems to be invalid.',
  min: 'This value should be greater than or equal to %s.',
  max: 'This value should be lower than or equal to %s.',
  range: 'This value should be between %s and %s.',
  minlength: 'This value is too short. It should have %s characters or more.',
  maxlength: 'This value is too long. It should have %s characters or fewer.',
  length: 'This value length is invalid. It should be between %s and %s characters long.',
  mincheck: 'You must select at least %s choices.',
  maxcheck: 'You must select %s choices or fewer.',
  check: 'You must select between %s and %s choices.',
  equalto: 'Values should be the same.',
});

Parsley.setLocale('en');

Parsley.addValidator(
    'passwordequalto',
    (value, refOrValue) => {
      if (!value) {
        return true; // Builtin validators all accept empty strings, except `required` of course
      }
      const $reference = $(refOrValue);
      const refValue = $reference.val();
      let result = false;
      if ($reference.length) {
        result = refValue ? (value === refValue) : true;
      } else {
        result = (value === refOrValue);
      }
      return result;
    }, 256)
  .addMessage('en', 'passwordequalto', 'Passwords should be the same.');

Parsley.addValidator(
    'birthdate',
    (value, refOrValue) => {
      if (!value) {
        return true; // Builtin validators all accept empty strings, except `required` of course
      }
      const result = moment.isDate(moment(value, 'YYYY / MM / DD'));
      return result;
    },
    256)
  .addMessage('en', 'birthdate', 'Incorrect date');

Parsley.options.trigger = 'submit';
Parsley.options.errorClass = 'is-error';
Parsley.options.successClass = 'is-valid';
Parsley.options.excluded = 'input[type=button], input[type = submit], input[type = reset], input[type = hidden], [disabled], [data-not-verified]';
Parsley.options.classHandler = el => $(el.element).closest('.form__wrapper, .nd-form__wrapper');
Parsley.options.errorsContainer = el => $(el.element).closest('.form__wrapper, .nd-form__wrapper').find('.error-message');

$('[data-validated-form]').parsley();

$(document).on('click', '.js-show-success-popup', (evt) => {
  evt.preventDefault();
  const self = evt.currentTarget;
  const fn = $(self).attr('data-callback');
  const form = $(self).closest('form')[0];
  $(form).parsley().whenValidate().done(() => {
    $(self).addClass('is-loading');
    window[fn](form).then((readySaved) => {
      const btn = $(form).find('.js-show-success-popup');
      const panel = $(btn).closest('[data-hidden-panel]');
      const popupId = $(btn).attr('data-popup');
      const popup = $(popupId);
      $(btn).removeClass('is-loading');
      if (readySaved) {
        // $(btn).addClass('is-disabled');
        // $(btn).attr('disabled', 'disabled');
        $(panel).addClass('is-saved');
        $(panel).removeClass('is-active');
        window.globalFunctions.openPopup(popup, false, {
          smallBtn: false,
          toolbar: false,
          idleTime: false,
          gutter: 0,
          preventCaptionOverlap: false,
        });
      }
    });
  });
});

/* eslint-enable no-unused-vars */
