import type { Entry } from 'jcampconverter';

/**
 * Display options for spectroscopy data
 */
export interface DisplayOptions {
  xLabel: string;
  xInverted: boolean;
  yLabel: string;
}

/**
 * Kind object defining how to handle a spectrum
 */
export interface Kind {
  normalization?: Record<string, any>;
  importation?: {
    converter: (value: number) => number;
  };
  kind?: string;
  display: DisplayOptions;
}

/**
 * Determines the appropriate Kind based on JCAMP data
 * @param data - JCAMP entry data
 * @returns The appropriate Kind or undefined
 */
export function getJcampKind(data: Entry): Kind | undefined {
  if (!data.dataType || !data.spectra?.[0]?.yUnits) {
    return undefined;
  }

  const dataType = data.dataType.toLowerCase();
  const yUnits = data.spectra[0].yUnits.toLowerCase();

  if (dataType.match(/infrared/)) {
    if (yUnits.match(/absorbance/)) {
      return IR_ABSORBANCE;
    } else {
      return IR_TRANSMITTANCE;
    }
  }
  return undefined;
}

export const IR_TRANSMITTANCE: Kind = {
  normalization: {},
  importation: {
    converter: (transmittance: number) => -Math.log10(transmittance),
  },
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance',
  },
};

export const IR_ABSORBANCE: Kind = {
  normalization: {},
  kind: 'Infrared',
  display: {
    xLabel: 'wavelength [cm-1]',
    xInverted: true,
    yLabel: 'Absorbance',
  },
};

export const nmr1H: Kind = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity',
  },
};

export const nmr13C: Kind = {
  display: {
    xLabel: 'δ [ppm]',
    xInverted: true,
    yLabel: 'Intensity',
  },
};
