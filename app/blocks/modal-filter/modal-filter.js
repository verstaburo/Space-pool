// import createTag from './create-tag';

const { $ } = window;

export default function modalFilter() {
  const modalFilterMethods = {
    open() {
      $('#modal-filter').addClass('is-opened');
    },
    close() {
      $('#modal-filter').removeClass('is-opened');
    },
    setValue() {

    },
    resetValue() {

    },
    resetAll() {

    },
    applyFilter() {

    },
  };

  $(document).on('click', '.js-open-modal-filter', modalFilterMethods.open);

  $(document).on('click', '.js-close-modal-filter', modalFilterMethods.close);
}
