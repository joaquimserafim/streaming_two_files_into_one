/*global require*/
/**
 * TEST WITH TUPLE-STREAM
 */

var fs = require('fs');

// split a Text Stream into a Line Stream
var split = require('split');
// simplified stream contsruction
var through = require('through');
// zip together two streams into a single stream with aligned pairwise data
var tuple = require('tuple-stream');

var file1 = fs.createReadStream('./file1');
var file2 = fs.createReadStream('./file2');

// chunks up its input by newlines, sending a separate chunk for each line
var a = split();
var b = split();
// kicks in and aligns the events by order such that the first event
// from a is paired with the first event from b and so on
tuple(a, b).pipe(through(function(pair) {
  var data = [pair[0], '-', pair[1], '\n'].join('');
  this.queue(data);
})).pipe(process.stdout);

// keep streams
var data1 = '';
var data2 = '';

// file1
file1.on('data', function (buffer) {
  var str = buffer.toString();
  data1 = data1.concat(str);
});

file1.on('end', function () {
  a.end(data1);
});

// file2
file2.on('data', function (buffer) {
  var str = buffer.toString();
  data2 = data2.concat(str);
});

file2.on('end', function () {
  b.end(data2);
});
