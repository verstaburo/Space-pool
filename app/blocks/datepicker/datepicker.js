import DatePicker from './Dates';

const $ = window.$;

export default function dates() {
  $(document).on('click', '.js-nd-arrange-viewing', (evt) => {
    evt.preventDefault();
    const self = evt.currentTarget;
    const baseElement = `#${$(self).attr('href').split('#').pop()}` || self;
    const param = {
      disabledDates: $(self).attr('data-disabled-dates'),
      minDate: $(self).attr('data-mindate'),
      maxDate: $(self).attr('data-maxdate'),
      startDate: $(self).attr('data-startdate'),
      resultField: $(self).attr('data-dates-result-field'),
      resultFormat: $(self).attr('data-dates-result-format'),
      alternativeField: $(self).attr('data-dates-alternative-field'),
      alternativeFormat: $(self).attr('data-dates-alternative-format'),
      viewType: $(self).attr('data-dates-view-type'),
    };

    const calendar = new DatePicker(baseElement, param);

    calendar.init();

    window.globalFunctions.openPopup($(baseElement), false, true);
  });
}
