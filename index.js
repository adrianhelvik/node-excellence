module.exports = { csv, xml };
module.exports.csv = csv;

function xml(options) {
  if (Array.isArray(options)) {
    options = { data: options };
  }

  let { data, title } = options;
  title = title || 'Unnamed excel sheet - generated with excellence';

  let precontent = [
    '<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
    '<Worksheet ss:Name="excellence">',
    '<Table>'
  ];

  let content = [];

  for (const row of data) {
    content.push('<Row>')
    for (const cell of row) {
      content.push('<Cell>')
      let type = 'String';
      content.push('<Data ss:Type="' + type + '">' + cell + '</Data>');
      content.push('</Cell>')
    }
    content.push('</Row>')
  }

  let postcontent = [
    '</Table>',
    '</Worksheet>',
    '</Workbook>',
  ];

  if (options._justContent) {
    return content.join('');
  }

  return precontent.concat(content).concat(postcontent).join('');
}

function csv(options) {
  if (Array.isArray(options)) {
    options = { data: options };
  }
  const { data } = options;

  let rows = []

  for (const row of data) {
    rows.push(parseCsvRow(row));
  }

  return rows.join('\n');
}

function parseCsvRow(row) {
  let result = [];
  for (const cell of row) {
    result.push(parseCsvCell(cell));
  }
  return result.join(',');
}

function parseCsvCell(cell) {
  let result = [];
  let isString = false;
  for (let i = 0; i < cell.length; i++) {
    const letter = cell[i];
    const nextletter = cell[i + 1];
    const prevletter = cell[i - 1];

    // Escape quotes
    if (letter === '"') {
      result.push('"'); // add an extra quote
    }

    // Add letters
    result.push(letter);
  }

  return '"' + result.join('') + '"';
}

if (require.main === module) {
  const json = process.argv[2];
  console.log(xml(JSON.parse(json)));
}
