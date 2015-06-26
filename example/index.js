var express = require('express');
var querystring = require('querystring');
var classy = require('../');
var app = express();

app.use(classy(__dirname));

var server = app.listen(7000, 'localhost', function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


  var http = require('http');
  http.get('http://localhost:7000/user/id?id=3', function (res) {
    console.log('<--', res.req.path, res.statusCode);
  });
  http.get('http://localhost:7000/?id=3', function (res) {
    console.log('<--', res.req.path, res.statusCode);
  });
  http.get('http://localhost:7000/user/id/1', function (res) {
    console.log('<--', res.req.path, res.statusCode);
  });

  var postData = querystring.stringify({
    'msg' : 'Hello World!'
  });
  var options = {
    hostname: 'localhost',
    port: 7000,
    path: '/user/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };
  var req = http.request(options, function (res) {
    console.log('<--', res.req.path, res.statusCode);
  });
  req.write(postData);
  req.end();

  options.path = '/user';
  req = http.request(options, function (res) {
    console.log('<--', res.req.path, res.statusCode);
  });
  req.write(postData);
  req.end();

});