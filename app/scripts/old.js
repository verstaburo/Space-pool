import './functions/mobileScale';
import {
  selects,
  datepicker,
} from '../blocks/form-elements/form-elements';
import {
  maps,
  mapsTwo,
} from '../blocks/map/map';
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
import {
  mapManipulations,
} from '../components/search-map/search-map';
import advancedSearch from '../components/advanced-filter/advanced-filter';
import textareaCounters from '../blocks/form-elements/textareaCounters';
import infoEditable from '../blocks/info-editable/info-editable';
import messageForm from '../blocks/message-form/message-form';
import photoPreview from '../blocks/photo-preview/photo-preview';
import reservationRequestShow from '../components/reservation-request/reservation-request';

const { $ } = window;

$(() => {
  selects();
  datepicker();
  calendar();
  maps();
  mapsTwo();
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
