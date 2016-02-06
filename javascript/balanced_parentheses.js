/**
 * Given a sequence consisting of parentheses, determine whether the expression is balanced. A sequence
 * of parentheses is balanced if every open parentheses can be paired uniquely with a closed
 * parentheses that occurs after the former. Also, the interval between them must be balanced. You will
 * be given three types of parentheses: (, {, and [.
 * 
 * {[()]} - This is a balanced parentheses. 
 * {[(])} - This is not a balanced parentheses. Input Format
 * 
 * The first line of input contains the number of test cases, T. Each test case consists of a single
 * line, S, the sequence of parentheses.
 * 
 * Constraints  1≤T≤1000  1≤lens≤1000, where lens is the length of the sequence.  Each character of the
 * sequence will be one of {, }, (, ), [, ].
 * 
 * Output Format
 * 
 * For each test case, print on a new line "YES" if the parentheses are balanced. 
 * Otherwise, print "NO". Do not print the quotes.
 */

function processData(input) {
  var stdIn = input.split('\n'),
    count = parseInt(stdIn[0], 10),
    c,
    line,
    curlOpen,
    parOpen,
    braOpen,
    isBalanced,
    l,
    length;

  function checkMatch(arrs, arrIndex) {
    if (arrs[arrIndex].length === 0) {
      return false;
    }

    var guess = arrs[arrIndex][arrs[arrIndex].length - 1],
      max = guess;

    arrs.forEach(function (ar) {
      if (ar[ar.length - 1] > max) {
        max = ar[ar.length - 1]; //new max
      }
    });

    return guess === max;
  }

  function handleCharacter(char, index) {
    var b = true;
    switch (char) {
      case '{':
        curlOpen.push(index);
        break;
      case '(':
        parOpen.push(index);
        break;
      case '[':
        braOpen.push(index);
        break;
      case '}':
        b = checkMatch([curlOpen, parOpen, braOpen], 0);
        curlOpen.pop();
        break;
      case ')':
        b = checkMatch([curlOpen, parOpen, braOpen], 1);
        parOpen.pop();
        break;
      case ']':
        b = checkMatch([curlOpen, parOpen, braOpen], 2);
        braOpen.pop();
        break;
    }
    return b;
  }

  //for every new line (problem)
  for (c = 1; c <= count; c += 1) {
    curlOpen = [], parOpen = [], braOpen = [], isBalanced = true;
    line = stdIn[c].trim().split('');
    length = line.length;

    //for every character in a line,
    //add open ones to stack 
    //and remove on close as long as there's a match. 
    for (l = 0; l < length && isBalanced; l += 1) {
      isBalanced = handleCharacter(line[l], l);
    }

    //check if any opens were left hanging...
    if (curlOpen.length > 0 || parOpen.length > 0 || braOpen.length > 0) {
      isBalanced = false;
    }

    console.log(isBalanced ? 'YES' : 'NO');
  }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});

process.stdin.on("end", function () {
  processData(_input);
});
