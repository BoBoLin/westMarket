#!/usr/local/bin/node

/* parse query to object */
var fs = require('fs');
var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
var result = JSON.parse(fs.readFileSync('./name.json'));

/* return header to browser */
console.log('Content-type: text/html; charset=utf-8\n');
var find = param['student'];
var name = result[find.toUpperCase()];

/* return normal HTML content */

if (typeof name == 'undefined')
	console.log('無此學號，請再試一次');
else
	console.log(name);
