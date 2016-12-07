module.exports = excellence;

function excellence(options) {
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

if (require.main === module) {
  const json = process.argv[2];
  console.log(excellence(JSON.parse(json)));
}
