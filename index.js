var slice = Array.prototype.slice;

function createTable() {
  var arrays = slice.call(arguments);
  var len = arrays.length;
  var maxLevel = arrays.length;
  var rowspan = 1;

  for (i = len - 1; i >= 0; i--) {
    arrays[i].rowspan = rowspan;
    rowspan *= arrays[i].length;
  }

  function dig(level) {
    var arr = arrays[level++];
    var i, j, tuples = [];
    var rowspan = arr.rowspan;

    if (level === maxLevel) {
      for (i = 0; i < arr.length; i++) {
        tuples.push(['<td>', arr[i], '</td>'].join(''));
      }
    } else {
      var subTuples = dig(level);
      for (i = 0; i < arr.length; i++) {
        for (j = 0; j < subTuples.length; j++) {
          if (j % rowspan === 0) {
            tuples.push('<td rowspan=' + rowspan + '>' + arr[i] + '</td>' + subTuples[j]);
          } else {
            tuples.push(subTuples[j]);
          }
        }
      }
    }

    return tuples;
  }

  return '<tr>' + dig(0).join('</tr><tr>') + '</tr>';
}

var A = ['A1', 'A2'];
var B = ['B1', 'B2', 'B3'];
var C = ['C1', 'C2', 'C3', 'C4'];

console.log(createTable(A, B, C));
