export function getJcampKind(data) {
  let dataType = data.dataType.toLowerCase();
  let yUnits = data.spectra[0].yUnits.toLowerCase();

  if (dataType.match(/infrared/)) {
    if (yUnits.match(/absorbance/)) {
      return IR_ABSORBANCE;
    } else {
      return IR_TRANSMITTANCE;
    }
  }
  return undefined;
}

export const IR_TRANSMITTANCE = {
  normalization: {},
  importation: {
    converter: (transmittance) => -Math.log10(transmittance),
  },
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance',
  },
};

export const IR_ABSORBANCE = {
  normalization: {},
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance',
  },
};

export const nmr1H = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity',
  },
};

export const nmr13C = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity',
  },
};
