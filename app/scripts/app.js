import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import './globalOptions';
import anchor from '../blocks/js-functions/anchor';
import {
  freezebuttons,
} from '../blocks/js-functions/freeze';
import scrollanimation from '../blocks/js-functions/scrollanimation';
import {
  selects,
  sliders,
  datepicker,
  inputmask,
  numberinput,
} from '../blocks/form-elements/form-elements';
import popups from '../blocks/popups/popups';
import scrollbar from '../blocks/scrollbar/scrollbar';
import header from '../components/header/header';
import scrollCont from '../blocks/scroll-form/scroll-form';
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
  inputmask();
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
});
