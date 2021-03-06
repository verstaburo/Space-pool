import 'polyfill-array-includes';
import 'array-from-polyfill';
import 'custom-event-polyfill';
import objectassign from 'es6-object-assign';
import find from 'array.prototype.find';
import findIndex from 'array.prototype.findindex';
import svg4everybody from 'svg4everybody';
import picturefill from 'picturefill';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import './modernizr';
import '../blocks/js-functions/detectors';
import anchor from '../blocks/js-functions/anchor';
import {
  freezebuttons,
} from '../blocks/js-functions/freeze';
import scrollbar from '../blocks/scrollbar/scrollbar';
import scrollanimation from '../blocks/js-functions/scrollanimation';
import {
  selects,
  sliders,
  datepicker,
  numberinput,
  textareaAutosize,
} from '../blocks/form-elements/form-elements';
import maskForm from '../blocks/form-elements/form-elements-masking';
import popups from '../blocks/popups/popups';
import header from '../components/header/header';
import scrollCont from '../blocks/sidebar/sidebar';
import slider from '../blocks/slider/slider';
import tooltips from '../blocks/tooltip/tooltip';
import tabs from '../blocks/tabs/tabs';
import {
  maps,
  mapsTwo,
} from '../blocks/map/map';
import '../blocks/rating/rating';
import accordions from '../blocks/accordion/accordion';
import '../blocks/dropdown/dropdown';
import '../blocks/put-block-into-slot/put-block-into-slot';
import heartActivation from '../blocks/button-heart/button-heart';
import desktopFilter from '../components/filter/filter';
import mobileFilter from '../components/compact-filter/compact-filter';
import addToFavorite from '../blocks/add-button/add-button';
import offerSelect from '../blocks/offer-select/offer-select';
import openPanel from '../blocks/panel/panel';
import spoilers from '../blocks/spoiler/spoiler';
import offerItemOpen from '../blocks/offer-item/offer-item';
import floatingLabels from '../blocks/form-box/form-box';
import formManipulations from '../blocks/form/form';
import tip from '../blocks/tip/tip';
import deleteObject from '../blocks/js-functions/deleteObject';
import switchOfferState from '../blocks/offer/offer';
import emptyOfferState from '../blocks/offers/offers';
import setBlogNewsTitlesHeight from '../blocks/blog/blog';
import '../blocks/form/validate';
import stickyMessage from '../blocks/sticky-message/sticky-message';
import blockHeightRounding from '../blocks/js-functions/blockHeightRounding';
import '../blocks/avatar-uploader/avatar-uploader';
import calendar from '../blocks/calendar/calendar';
import uploader from '../blocks/uploader/uploader';
import toggleFilter from '../components/search-filter/search-filter';
import truncateBlocks from '../blocks/js-functions/lineClamp';
import mapManipulations from '../components/search-map/search-map';
import advancedSearch from '../components/advanced-filter/advanced-filter';
import textareaCounters from '../blocks/form-elements/textareaCounters';
import infoEditable from '../blocks/info-editable/info-editable';
import messageForm from '../blocks/message-form/message-form';
import infoNoitces from '../blocks/info-notices/info-notices';
import compositeTab from '../blocks/composite-tab/composite-tab';
import newSpaceStep6 from '../pages/new-space/new-space-step8';
import newSpaceStep5 from '../pages/new-space/new-space-step5';
import checkInput from '../blocks/form-elements/check-input';
import photoPreview from '../blocks/photo-preview/photo-preview';
import fileUploader from '../blocks/file-uploader/file-uploader';
import fileRemove from '../blocks/file/file';
import profile from '../pages/profile/profile';
import cancelationPopupSteps from '../components/popup-cancelation-contract/cancelationPopupSteps';
import stpFormSwitch from './functions/stepForm';
import reservationRequestShow from '../components/reservation-request/reservation-request';

const $ = window.$;

$(() => {
  objectassign.polyfill();
  find.shim();
  findIndex.shim();
  svg4everybody();
  picturefill();
  objectFitImages();
  anchor();
  freezebuttons();
  scrollbar();
  selects();
  sliders();
  datepicker();
  popups();
  header();
  calendar();
  slider();
  tooltips();
  tabs();
  numberinput();
  maps();
  mapsTwo();
  scrollanimation();
  scrollCont();
  heartActivation();
  desktopFilter();
  mobileFilter();
  addToFavorite();
  accordions();
  offerSelect();
  openPanel();
  spoilers();
  offerItemOpen();
  floatingLabels();
  textareaAutosize();
  maskForm();
  formManipulations();
  tip();
  deleteObject();
  switchOfferState();
  emptyOfferState();
  setBlogNewsTitlesHeight();
  stickyMessage();
  blockHeightRounding();
  uploader();
  mapManipulations();
  truncateBlocks();
  toggleFilter();
  advancedSearch();
  textareaCounters();
  infoEditable();
  messageForm();
  infoNoitces();
  compositeTab();
  newSpaceStep6();
  newSpaceStep5();
  checkInput();
  photoPreview();
  fileRemove();
  fileUploader();
  profile();
  cancelationPopupSteps();
  stpFormSwitch();
  reservationRequestShow();
});
