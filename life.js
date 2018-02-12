var fs = require('fs');
var readlineSync = require('readline-sync');

while (true) {
  var link_file = readlineSync.question('Input a link to the file. If you don`t input link, will choose default file:\n\t') || 'files/default.txt';

  try {
    var field = fs.readFileSync(link_file).toString().split('\n');

    for (var i = 0; i < field.length; i++) {
      field[i] = field[i].split(' ');

      for (var j = 0; j < field[i].length; j++) {
        field[i][j] = +field[i][j];
      }
    }
    break;
  } catch (e) {
    console.log('Something went wrong... Try again!');
  }
}

var new_field = [];

for (var i = 0; i < field.length; i++) {
  process.stdout.write(field[i].join(' '));
  process.stdout.write('\n');
}

(function start() {
  console.log('\x1Bc');
  printField(field);

  setInterval(function() {
    console.log('\x1Bc');

    newStep();
    printField(new_field);
  }, 500);
})();

function newStep() {
  for (var i = 0; i < field.length; i++) {
    new_field[i] = [];

    for (var j = 0; j < field[i].length; j++) {
      new_field[i][j] = 0;

      var count_neighbor = neighbor(i, j);

      if (
        (field[i][j] == 0 && count_neighbor == 3)
        ||
        (field[i][j] == 1 && (count_neighbor == 2 || count_neighbor == 3))
      ) new_field[i][j] = 1;
    }
  }

  field = [].concat(new_field);
}

function neighbor(i, j) {
  var count_neighbor = 0;

  for (var n = i - 1; n <= i + 1; n++) {
    for (var m = j - 1; m <= j + 1; m++) {
      if ((n == i && m == j) || (m < 0) || (m > field[i].length - 1) || (n < 0) || (n > field.length - 1)) continue;

      if (field[n][m] == 1) count_neighbor++;
    }
  }

  return count_neighbor;
}

function printField(field) {
  for (var i = 0; i < field.length; i++) {
    for (var j = 0; j < field[i].length; j++) {
      process.stdout.write((field[i][j]) ? ('■') : ('o'));
    }
    process.stdout.write('\n');
  }
}
