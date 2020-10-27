import positioning from './functions/position';
import ndSelects from '../blocks/form-elements/nd-select';
import {
  sliders,
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

const $ = window.$;

$(() => {
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
});
