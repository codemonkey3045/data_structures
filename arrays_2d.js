/**
 * You are given a 2D array with dimensions 6*6. An hourglass in an array is defined as a portion shaped like this:
 *
 * a b c
 *   d
 * e f g
 * For example, if we create an hourglass using the number 1 within an array full of zeros, it may look like this:
 *
 * 1 1 1 0 0 0
 * 0 1 0 0 0 0
 * 1 1 1 0 0 0
 * 0 0 0 0 0 0
 * 0 0 0 0 0 0
 * 0 0 0 0 0 0
 * Actually, there are many hourglasses in the array above. The three topmost hourglasses are the following:
 *
 * 1 1 1     1 1 0     1 0 0
 *   1         0         0
 * 1 1 1     1 1 0     1 0 0
 * The sum of an hourglass is the sum of all the numbers within it. The sum for the hourglasses above are 7, 4, and 2,
 * respectively.
 *
 * In this problem, you have to print the largest sum among all the hourglasses in the array.
 *
 * Note: If you have already solved the problem "Java 2D array" in the data structures chapter of the Java domain,
 * you may skip this challenge.
 *
 * Input Format
 *
 * There will be exactly 6 lines of input, each containing 6 integers separated by spaces. Each integer will be between
 * -9 and 9, inclusively.
 *
 * Output Format
 *
 * Print the answer to this problem on a single line.
 */

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
  input_stdin += data;
});

process.stdin.on('end', function () {
  input_stdin_array = input_stdin.split("\n");
  main();
});

function readLine() {
  return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
  var arr = [], arr_i, r, rows, c, cols, curr, max;
  for (arr_i = 0; arr_i < 6; arr_i += 1) {
    arr[arr_i] = readLine().trim().split(' ').map(Number);
  }

  rows = 6; //problem statement
  cols = 6; //problem statement
  max = -9 * 7; //default based on -9 being the least number and there's 7 positions to sum

  for (r = 0; r < rows - 2; r += 1) {
    for (c = 0; c < cols - 2; c += 1) {
      curr = arr[r][c] + arr[r][c + 1] + arr[r][c + 2] +
        arr[r + 1][c + 1] +
        arr[r + 2][c] + arr[r + 2][c + 1] + arr[r + 2][c + 2];
      if (curr > max) {
        max = curr;
      }
    }
  }
  console.log(max);
}
