export function convertToText(data, options = {}) {
  let { fs = '\t', rs = '\n' } = options;
  let { matrix, meta, ids, x } = data;
  let allKeysObject = {};
  for (let metum of meta) {
    if (metum) {
      for (let key of Object.keys(metum)) {
        let type = typeof metum[key];
        if (type === 'number' || type === 'string' || type === 'boolean') {
          allKeysObject[key] = true;
        }
      }
    }
  }
  let allKeys = Object.keys(allKeysObject);

  let lines = [];
  let line = [];
  line.push('id', ...allKeys, ...x);
  lines.push(line.join(fs));

  for (let i = 0; i < ids.length; i++) {
    line = [];
    line.push(ids[i]);
    for (let key of allKeys) {
      line.push(removeSpecialCharacters(meta[i][key]));
    }
    line.push(...matrix[i]);
    lines.push(line.join(fs));
  }
  return lines.join(rs);
}

function removeSpecialCharacters(string) {
  if (typeof string !== 'string') {
    return string;
  }
  return string.replaceAll(/[\t\n\r]+/g, ' ');
}
