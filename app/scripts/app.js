import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import './modernizr';
import anchor from '../blocks/js-functions/anchor';
import {
  freezebuttons,
} from '../blocks/js-functions/freeze';
import scrollanimation from '../blocks/js-functions/scrollanimation';
import {
  selects,
  sliders,
  datepicker,
  numberinput,
  textareaAutosize,
  passwordMask,
} from '../blocks/form-elements/form-elements';
import maskForm from '../blocks/form-elements/form-elements-masking';
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
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
import '../components/offer-short/offer-short';
import offerSelect from '../blocks/offer-select/offer-select';
import openPanel from '../blocks/panel/panel';
import spoilers from '../blocks/spoiler/spoiler';
import offerItemOpen from '../blocks/offer-item/offer-item';
import floatingLabels from '../blocks/form-box/form-box';
import formManipulations from '../blocks/form/form';
import tip from '../blocks/tip/tip';
import deleteObject from '../blocks/js-functions/deleteObject';

const $ = window.$;

$(() => {
  svg4everybody();
  objectFitImages();
  anchor();
  freezebuttons();
  selects();
  sliders();
  popups();
  scrollbar();
  header();
  slider();
  tooltips();
  tabs();
  datepicker();
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
  passwordMask();
  formManipulations();
  tip();
  deleteObject();
});
