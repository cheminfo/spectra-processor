export function addChartDataStyle(data, spectrum) {
  data.styles = {
    unselected: {
      lineColor: spectrum.meta.color || 'darkgrey',
      lineWidth: 1,
      lineStyle: 1,
    },
    selected: {
      lineColor: spectrum.meta.color || 'darkgrey',
      lineWidth: 3,
      lineStyle: 1,
    },
  };
  data.label = spectrum.meta.id || spectrum.id;
}
