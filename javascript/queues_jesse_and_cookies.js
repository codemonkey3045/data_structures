/** 
 * NOTE TO SELF::: Need to re-write. It's too slow with all the array shift/unshifts/concats...
 *
 * Jesse loves cookies. He wants the sweetness of all his cookies to be greater than value K. To do
 * this, Jesse repeatedly mixes two cookies with the least sweetness. He creates a special combined
 * cookie with:
 * 
 * sweetness =(1× Least sweet cookie + 2× 2nd least sweet cookie).
 * 
 * He repeats this procedure until all the cookies in his collection have a sweetness ≥K.  You are
 * given Jesse's cookies. Print the number of operations required to give the cookies a sweetness ≥K.
 * Print −1 if this isn't possible.
 * 
 * Input Format
 * 
 * The first line consists of integers N, the number of cookies and K, the minimum required sweetness,
 * separated by a space.  The next line contains N integers describing the array A where Ai is the
 * sweetness of the ith cookie in Jesse's collection.
 */

function processData(input) {
    var stdIn = input.split('\n');
    var countMin = stdIn[0].trim().split(' ');
    var count = parseInt(countMin[0], 10);
    var min = parseInt(countMin[1], 10);
    var cookies = stdIn[1].trim().split(' ').map(Number).sort(function(a, b) { return a - b;});
    
    var first, second, adding, n, lessThan, operations = 0, isPossible = true;
    while(cookies[0] < min && cookies.length >= 2) {
        first = cookies.shift();
        second = cookies.shift();
        
        adding = first * 1 + second * 2;
        n = 0;
        while(cookies[n] < adding) {
            n++;
        }
        lessThan = cookies.splice(0,n);
        cookies = lessThan.concat([adding], cookies);
        
        operations++;
    }
    
    if(cookies[0] < min) {
        isPossible = false; //not possible to reach min for all cookies
    }
    console.log(isPossible ? operations : '-1');
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
