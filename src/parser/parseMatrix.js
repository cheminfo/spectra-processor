/**
 * Creates a g
 * @param {string} text - String containing the text data
 * @param {object} [options={}]
 * @param {string} [options.fs='\t'] - Field separator
 * @returns {object} - {matrix, data, x, ids}
 */
export default function parseMatrix(text, options = {}) {
  const lines = text.split(/[\n\r]+/).filter(Boolean);
  const { fs = '\t' } = options;
  let currentMatrix = [];
  let ids = [];
  let meta = [];
  let x = [];

  let headers = lines[0].split(fs);
  let labels = [];
  for (let i = 0; i < headers.length; i++) {
    let header = headers[i];
    if (Number.isNaN(Number(header))) {
      labels[i] = header;
    } else {
      x = headers.slice(i).map(Number);
      break;
    }
  }

  for (let i = 1; i < lines.length; i++) {
    let line = lines[i];
    let parts = line.split('\t');
    ids.push(parts[0]);
    let oneMeta = {};
    meta.push(oneMeta);
    for (let j = 1; j < parts.length; j++) {
      if (j < labels.length) {
        oneMeta[labels[j]] = parts[j];
      } else {
        currentMatrix.push(parts.slice(labels.length).map(Number));
        break;
      }
    }
  }
  return { x, meta, matrix: currentMatrix, ids };
}
