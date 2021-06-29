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
// search and space
import offerPanel from '../blocks/offer-description-panel/offer-description-panel';
import ShowPopover from './functions/showPopover';
import toggleFavorite from '../blocks/favorite/favorite';
import modalFilter from '../blocks/modal-filter/modal-filter';
// other
import positioning from './functions/position';
import ndSelects from '../blocks/form-elements/nd-select';
import {
  sliders,
  selects, // from old
  datepicker, // from old
} from '../blocks/form-elements/form-elements';
import textareaAutosize from '../blocks/form-elements/textareaAutosize';
import numberinput from '../blocks/form-elements/numberinputs';
import maskForm from '../blocks/form-elements/form-elements-masking';
import popups from '../blocks/popups/popups';
import scrollCont from '../blocks/sidebar/sidebar';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
import heartActivation from '../blocks/button-heart/button-heart';
import offerSelect from '../blocks/offer-select/offer-select';
import formManipulations from '../blocks/form/form';
import deleteObject from './functions/deleteObject';
import '../blocks/avatar-uploader/avatar-uploader';
import '../blocks/form/validate';
import blockHeightRounding from './functions/blockHeightRounding';
import uploader from '../blocks/uploader/nd-uploader';
import truncateBlocks from './functions/lineClamp';
import {
  mapManipulations, // from old
  ndSearchMapManipulations,
} from '../components/search-map/search-map';
import compositeTab from '../blocks/composite-tab/composite-tab';
import newSpaceStep5 from '../pages/new-space/new-space-step5';
import fileUploader from '../blocks/file-uploader/file-uploader';
import fileRemove from '../blocks/file/file';
import profile from '../pages/profile/profile';
import cancelationPopupSteps from '../components/popup-cancelation-contract/cancelationPopupSteps';
import offerCard from '../components/offer-card/offer-card';
import dates from '../blocks/datepicker/datepicker';
import switchFormContent from './functions/switchFormContent';
import filterMenu from '../components/filter-menu/filter-menu';
import initCharts from '../blocks/chart/chartInit';
import copyToClip from './functions/copy';
import formSubmitSwitch from './functions/formSubmitSwitch';
import allDayFixation from './functions/allDayFixation';
import ndCropedImage from '../components/popup-image-cropper/popup-image-cropper';
import heightEqualizer from './functions/heightEqualizer';
import filterTagsScroll from '../blocks/filter-tags/filter-tags';
import srMapToggle from '../components/search-map/search-map-v2';
import { modalShowes } from '../blocks/modals/modals';
import outputValuesFromModal from '../blocks/modal/modal';
import layoutsInit from '../components/layout/layout';
// old
import './functions/mobileScale';
// import {
//   selects,
//   datepicker,
// } from '../blocks/form-elements/form-elements';
import accordions from '../blocks/accordion/accordion';
import desktopFilter from '../components/filter/filter';
import mobileFilter from '../components/compact-filter/compact-filter';
import addToFavorite from '../blocks/add-button/add-button';
import openPanel from '../blocks/panel/panel';
import spoilers from '../blocks/spoiler/spoiler';
import offerItemOpen from '../blocks/offer-item/offer-item';
import tip from '../blocks/tip/tip';
import switchOfferState from '../blocks/offer/offer';
import emptyOfferState from '../blocks/offers/offers';
import calendar from '../blocks/calendar/calendar';
import toggleFilter from '../components/search-filter/search-filter';
// import {
//   mapManipulations,
// } from '../components/search-map/search-map';
import advancedSearch from '../components/advanced-filter/advanced-filter';
import textareaCounters from '../blocks/form-elements/textareaCounters';
import infoEditable from '../blocks/info-editable/info-editable';
import messageForm from '../blocks/message-form/message-form';
import photoPreview from '../blocks/photo-preview/photo-preview';
import reservationRequestShow from '../components/reservation-request/reservation-request';

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
  // search
  offerPanel();
  ShowPopover();
  toggleFavorite();
  modalFilter();
  // other
  positioning();
  ndSelects();
  sliders();
  numberinput();
  textareaAutosize();
  maskForm();
  popups();
  scrollCont();
  tooltips();
  tabs();
  heartActivation();
  offerSelect();
  window.globalFunctions.offerSelect = offerSelect;
  formManipulations();
  deleteObject();
  blockHeightRounding();
  uploader();
  truncateBlocks();
  compositeTab();
  newSpaceStep5();
  fileRemove();
  fileUploader();
  profile();
  cancelationPopupSteps();
  offerCard();
  dates();
  switchFormContent();
  ndSearchMapManipulations();
  filterMenu();
  initCharts();
  copyToClip();
  formSubmitSwitch();
  allDayFixation();
  ndCropedImage();
  heightEqualizer();
  filterTagsScroll();
  srMapToggle();
  modalShowes();
  outputValuesFromModal();
  layoutsInit();
  // old
  selects();
  datepicker();
  calendar();
  desktopFilter();
  mobileFilter();
  addToFavorite();
  accordions();
  openPanel();
  spoilers();
  offerItemOpen();
  tip();
  switchOfferState();
  emptyOfferState();
  mapManipulations();
  toggleFilter();
  advancedSearch();
  textareaCounters();
  infoEditable();
  messageForm();
  photoPreview();
  reservationRequestShow();
});
