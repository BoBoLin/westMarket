#!/usr/local/bin/node
/* the above line (must be the first line) enables apache to execute this program */

/* parse query to object */
var fs = require('fs');
var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
var line = JSON.parse(fs.readFileSync('./name.json'));

/* return header to browser */
console.log('Content-type: text/html; charset=utf-8\n');

/* return normal HTML content */
var name = line[param['id'].toUpperCase()];

if (typeof name == 'undefined')
	console.log('無此學號');
else
  console.log(name);
