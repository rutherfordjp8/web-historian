var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var data = archive.readListOfUrls();
  }
  res.end({results: data});
  //res.end(archive.paths.list);

};
