/** 
 * You have an empty sequence, and you will be given NN queries. Each query is one of these three types:
 * 
 * 1 x  -Push the element x into the stack.
 * 2    -Delete the element present at the top of the stack.
 * 3    -Print the maximum element in the stack.
 * Input Format
 * 
 * The first line of input contains an integer, NN. The next NN lines each contain an above mentioned query. (It is guaranteed that each query is valid.)
 * 
 * Constraints 
 * 1≤N≤1051≤N≤105 
 * 1≤x≤1091≤x≤109 
 * 1≤type≤31≤type≤3
 * Output Format
 * 
 * For each type 33 query, print the maximum element in the stack on a new line.
 *
 *
 *  Plan, use a regular array as stack with push/pop -- should work quick enough. if not, backup plan is to use {}
 *  where key would be index.
 *  To track max for quick printing, a maxBinaryHeap should do. I'll just have to check max is still in the stack 
 *  before printing.
 */

var MaxBinaryHeap = function(data) {
    this.data = data || [];
    this.size = this.data.length;
    for (var i = Math.floor((this.size - 1)/2); i >= 0; i -= 1) {
        this.bubbleDown(i, data[i]);
    }
}

MaxBinaryHeap.prototype.getParentIndex = function(child) {
    return Math.floor((child - 1)/2);
}

MaxBinaryHeap.prototype.getLeftChildIndex = function(parent) {
    return parent * 2 + 1;
} 

MaxBinaryHeap.prototype.getRightChildIndex = function(parent) {
    return parent * 2 + 2;
} 

MaxBinaryHeap.prototype.add = function(d) {
        console.log('before add', this.data);
    this.data.push(d);
    this.size++;
    this.bubbleUp(this.size - 1, d);
        console.log('after add', this.data);
    return this.data[0];
}

MaxBinaryHeap.prototype.remove = function() {
    console.log('before remove', this.data);
    var max = this.data[0], min = this.data.pop();
    this.data[0] = min; 
    this.size--;
    this.bubbleDown(0, min);
        console.log('after remove', this.data);
    return max;
};
 
MaxBinaryHeap.prototype.peek = function() {
    return this.data[0];
};

MaxBinaryHeap.prototype.isOrdered = function(parent, child) {
    return parent < child;
}

MaxBinaryHeap.prototype.bubbleUp = function(childInd, childData) {
    var pInd, pData;
    if (childInd > 0) {
        pInd = this.getParentIndex(childInd);
        pData = this.data[pInd];
        if (!this.isOrdered(childData, pData)) {
            this.data[pInd] = childData;
            this.data[childInd] = pData;
            this.bubbleUp(pInd, childData);
        }
    }
}

MaxBinaryHeap.prototype.bubbleDown = function(pInd, pData) {
    if(pInd < this.data.length) {
        var targetInd = pInd,
            targetData = pData,
            leftInd = this.getLeftChildIndex(pInd),
            rightInd = this.getRightChildIndex(pData),
            leftData,
            rightData;
 
        //handle left
        if(leftInd < this.data.length) {
            leftData = this.data[leftInd];
            if(this.isOrdered( leftData, targetData )) {
                targetInd = leftInd;
                targetData = leftData;
            }
        }
         
        //handle right
        if(rightInd < this.data.length) {
            rightData = this.data[rightInd];
            if(this.isOrdered(rightData, targetData )) {
                targetInd = rightInd;
                targetData = rightData;
            }
        }
 
        if(targetInd !== pInd) {
            this.data[pInd] = targetData;
            this.data[targetInd] = pData;
            this.bubbleDown(targetInd, pData);
        } 
    }
};
 


function processData(input) {
    var stdIn = input.split('\n');
    var lines = parseInt(stdIn[0], 10);
    var stack = [];
    var m, temp, max = new MaxBinaryHeap(), value;
    for(m = 1; m <= lines; m += 1) {
        temp = stdIn[m].split(' ');
        switch (temp[0]) {
            case '1': 
                temp[1] = parseInt(temp[1], 10);
                max.add(temp[1]);
                stack.push(temp[1]);
                console.log('max', max);
                break;
            case '2':
                stack.pop();
                break;
            case '3':
                console.log('stack', stack);
                console.log('heap', max);
                while(stack.indexOf(max.peek()) < 0) {
                    max.remove(); //remove all maxs no longer in our stack
                }
                console.log(max.peek()); //current max 
                break;
        }
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
