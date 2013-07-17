/**
 * Created with IntelliJ IDEA.
 * User: joaquimserafim
 * Date: 15/07/13
 * Time: 21:49
 * To change this template use File | Settings | File Templates.
 */
(function () {
  for (var i = 0; i < 1000000; i++) {
    var d = [];
    for (var ii = 0; ii < 4; ii++) {
      // random a number
      var n = Math.floor(Math.random()*10);
      d.push(n);
    }
    process.stdout.write([i, '-', d.join(',')].join(''));
    console.log();
  }
})();