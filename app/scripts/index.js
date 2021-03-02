import 'core-js';
import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import './modernizr';
import './functions/detectors';
import {
  globalFreezes,
} from './functions/freeze';
import scrollbar from '../blocks/scrollbar/scrollbar';
import scrollanimation from './functions/scrollanimation';
import header from '../components/header/header';
import slider from '../blocks/slider/slider';
import '../blocks/put-block-into-slot/put-block-into-slot';
import floatingLabels from '../blocks/form-box/form-box';
import setBlogNewsTitlesHeight from '../blocks/blog/blog';
import stickyMessage from '../blocks/sticky-message/sticky-message';
import infoNoitces from '../blocks/info-notices/info-notices';
import stpFormSwitch from './functions/stepForm';
import autocompleteList from '../blocks/autocomplete-list/autocomplete-list';
import buttonHover from '../blocks/button/button';
import locationTagsMax from '../components/tags-map/tags-map';
import mapPopup from '../blocks/map-popup/map-popup';
import screenKeyboardVisibility from './functions/screenKeyboardVisibility';
import ShiftInputLocationOnFocus from '../components/search-panel/search-panel';
import selection from '../blocks/selection/selection';

const {
  $,
} = window;

$(() => {
  svg4everybody();
  picturefill();
  objectFitImages();
  globalFreezes();
  scrollbar();
  header();
  slider();
  scrollanimation();
  floatingLabels();
  setBlogNewsTitlesHeight();
  stickyMessage();
  infoNoitces();
  stpFormSwitch();
  autocompleteList();
  buttonHover();
  locationTagsMax();
  mapPopup();
  screenKeyboardVisibility();
  ShiftInputLocationOnFocus();
  selection();
});
