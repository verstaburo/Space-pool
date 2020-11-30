import Chart from './chart';

export default function initCharts() {
  const charts = document.querySelectorAll('.chart');

  window.globalFunctions.createChart = (el) => new Chart(el);

  if (charts.length > 0) {
    charts.forEach((el) => new Chart(el));
  }
}
