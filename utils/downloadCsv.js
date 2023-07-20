const { Parser } = require('json2csv');
const { Readable } = require('stream');

exports.generateCsvData = (users, fields) => {
  const json2csvParser = new Parser({ fields });
  return json2csvParser.parse(users);
};

exports.downloadCsvFile = (res, csvData, filename) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  
  const readableStream = new Readable();
  readableStream.push(csvData);
  readableStream.push(null);
  readableStream.pipe(res);
};