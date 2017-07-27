var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var statusCode;

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    statusCode = 200;
    res.writeHead(statusCode, headers);

    // var resultsData;
    // //Get the urls data
    // archive.readListOfUrls(function(data) {
    //   resultsData = data;
    // });
    fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) {
      if (err) {
        console.log('error ' + err);
      }

      console.log(data);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });

  } else if (req.method === 'POST') {
    statusCode = 201;
    res.writeHead(statusCode, headers);
    res.end();

  } else if (req.method === 'PUT') {
    statusCode = 200;
    res.writeHead(statusCode, headers);
    res.end();

  } else if (req.method === 'DELETE') {
    statusCode = 200;
    res.writeHead(statusCode, headers);
    res.end();

  } else if (req.method === 'OPTIONS') {
    statusCode = 200;
    res.writeHead(statusCode, headers);
    res.end();

  } else {
    statusCode = 404;
    res.writeHead(statusCode, headers);
    res.end();
  }

  // res.writeHead(statusCode, headers);
  // res.end({results: data});
  //res.end(archive.paths.list);

};
