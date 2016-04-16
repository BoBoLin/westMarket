#!/usr/local/bin/node

/* parse query to object */
var fs = require('fs');
var querystring = require('querystring');
var param = querystring.parse(process.env.QUERY_STRING);
var list = JSON.parse(fs.readFileSync('./name.json'));

/* return header to browser */
console.log('Content-type: text/html; charset=utf-8\n');

/* return normal HTML content */
var name = list[param['id'].toUpperCase()];
if (typeof name == 'undefined') {
  console.log('學號不存在!');
} else {
  console.log(name);
}
