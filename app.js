/**
 * core modules
 */
var fs = require('fs');
/**
 * external modules
 */
var split = require('split');
var through = require('through');
var tuple = require('tuple-stream');
// create streams
var file1 = fs.createReadStream('./file1');
var file2 = fs.createReadStream('./file2');
//
var a = split();
var b = split();
//
tuple(a, b).pipe(through(function (pair) {
  var data = [pair[0], '-', pair[1], '\n'].join('');
  this.queue(data);
})).pipe(process.stdout);

// keep streams
var data1 = '';
var data2 = '';

// File1
// start streaming
file1.on('data', function (buffer) {
  var str = buffer.toString();
  data1 = data1.concat(str);
});
// end stream
file1.on('end', function () {
  a.end(data1);
  //console.log(data1);
});

// File1
// start streaming
file2.on('data', function (buffer) {
  var str = buffer.toString();
  data2 = data2.concat(str);
});
// end stream
file2.on('end', function () {
  b.end(data2);
  //console.log(data2);
});
