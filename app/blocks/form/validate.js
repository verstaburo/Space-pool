/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'parsleyjs';

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

$('[data-validated-form]').parsley({
  trigger: 'input',
  errorClass: 'is-error',
  successClass: 'is-valid',
  excluded: 'input[type=button], input[type = submit], input[type = reset], input[type = hidden], [disabled]',
  classHandler(el) {
    return $(el.element).closest('.form__wrapper');
  },
  errorsContainer(el) {
    return $(el.element).closest('.form__wrapper').find('.error-message');
  },
});

/* eslint-enable no-unused-vars */
