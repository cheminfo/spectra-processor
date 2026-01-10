import type { DataXY } from 'cheminfo-types';
import type { Entry } from 'jcampconverter';
import { convert } from 'jcampconverter';

import type { Kind } from '../Kinds.js';
import { getJcampKind } from '../Kinds.js';

export interface ParseJcampResult {
  data: DataXY;
  kind?: Kind;
  meta: Record<string, any>;
  info: Record<string, any>;
}

/**
 * Create a spectrum from a JCAMP file
 * @param jcampText - String containing the JCAMP data
 * @returns Parsed spectrum data with kind, meta, and info
 */
export default function parseJcamp(jcampText: string): ParseJcampResult {
  const parsed: Entry = convert(jcampText, {
    keepRecordsRegExp: /.*/,
  }).flatten[0];
  const kind = getJcampKind(parsed);
  const data = parsed.spectra[0].data as unknown as DataXY;
  const { meta, info } = parsed;

  // Convert the data if needed
  if (kind?.importation?.converter) {
    data.y = data.y.map(kind.importation.converter);
  }

  return { data, kind, meta, info };
}
