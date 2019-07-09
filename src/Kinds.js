export function getJcampKind(data) {
  let datatype = data.spectra[0].dataType.toLowerCase();
  let xUnit = data.spectra[0].xUnit.toLowerCase();
  let yUnit = data.spectra[0].yUnit.toLowerCase();

  if (datatype.match(/infrared/)) {
    if (yUnit.match(/absorbance/)) {
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
    converter: (transmittance) => -Math.log10(transmittance)
  },
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance'
  }
};

export const IR_ABSORBANCE = {
  normalization: {},
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance'
  }
};

export const nmr1H = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity'
  }
};

export const nmr13C = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity'
  }
};
