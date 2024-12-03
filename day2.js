const fs = require("fs");
const input_array = fs.readFileSync("day2-input.txt").toString().split("\n");
// const input_array = fs.readFileSync("day2-example-input.txt").toString().split("\n");


const reports = input_array.map((row) => {
    return row.split(" ").map((y)=> parseInt(y));
});

const rowIsIncreasing = (row) => {
    let last = null;
    let returnValue = true
    row.forEach(element => {
        let diff = element - last;
        if (last !== null && element < last) {
           returnValue = false;
        }
        if (last !== null && (diff < 1 || diff > 3)) {
            returnValue = false;
        }
        last = element;
    });
    return returnValue;
}

const rowIsDecreasing = (row, ) => {
    let last = null;
    let returnValue = true
    row.forEach(element => {
        let diff = last - element;
        if (last !== null && element > last) {
            returnValue = false;
        }
        if (last !== null && (diff < 1 || diff > 3)) {

            returnValue = false;
        }
        last = element;
    });
    return returnValue;
}

const safeRow = (row, dampening) => {
    safe =  (rowIsIncreasing(row) || rowIsDecreasing(row)) ;

    if (dampening && !safe) {
        safe = row.some((element, index) => {
            let spliced = row.slice();
            spliced.splice(index, 1);
            return rowIsIncreasing(spliced) || rowIsDecreasing(spliced);
        })
    };
    return safe;
}

const numSafeReports = (dampening) => {
    return reports.filter(row => safeRow(row,dampening)).length;
}

// part 1
console.log(numSafeReports(false));

//part 2
console.log(numSafeReports(true));