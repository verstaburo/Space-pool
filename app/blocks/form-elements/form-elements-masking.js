import $ from 'jquery';
import 'jquery-mask-plugin';

// маскирование
export default function maskForm() {
  $('[data-tel-code]').mask('+09');
  $('[data-tel-number]').mask('+09900000000009');
}
