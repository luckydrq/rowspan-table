var slice = Array.prototype.slice;

function createTable() {
  var arrays = slice.call(arguments);
  var maxLevel = arrays.length;

  function dig(level) {
    var arr = arrays[level++];
    var i, j, tuples = [];

    if (level === maxLevel) {
      for (i = 0; i < arr.length; i++) {
        tuples.push([arr[i]]);
      }
    } else {
      var subTuples = dig(level);
      for (i = 0; i < arr.length; i++) {
        for (j = 0; j < subTuples.length; j++) {
          tuples.push([arr[i]].concat(subTuples[j]));
        }
      }
    }

    return tuples;
  }

  return dig(0);
}

var A = ['A1', 'A2'];
var B = ['B1', 'B2', 'B3'];
var C = ['C1', 'C2', 'C3', 'C4'];

console.log(createTable(A, B, C));
