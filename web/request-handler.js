var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var urlParser = require('url');
var utils = require('./http-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {

    var parts = urlParser.parse(req.url).pathname;
    if (parts === '/') {
      parts = '/index.html'; 
    }
    utils.serveAssets(res, parts, function() {
      // trim leading slash if present
      if (parts[0] === '/') { parts = parts.slice(1); }

      archive.isUrlInList(parts, function(found) {
        if (found) {
          utils.sendRedirect(res, '/loading.html');
        } else {
          utils.send404(res);
        }
      });
    });
  } else if (req.method === 'POST') { 
    utils.collectData(req, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      console.log(url);
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { // found site
          // check if site is on disk
          console.log(found);
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              // redirect to site page (/www.google.com)
              utils.sendRedirect(res, '/' + url);
            } else {
              // Redirect to loading.html
              utils.sendRedirect(res, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            utils.sendRedirect(res, '/loading.html');
          });
        }
      });
    });
  } else {
    utils.send404(res);
  } 
};

  // res.writeHead(statusCode, headers);
  // res.end({results: data});
  //res.end(archive.paths.list);


