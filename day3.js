const fs = require("fs");
const input = fs.readFileSync("day3-input.txt").toString();
// const input = fs.readFileSync("day3-example-input.txt").toString();

const mulRegex = /((mul\()(\d{1,3}),(\d{1,3})\))/g;

const instancesOfMul = input.matchAll(mulRegex);

const sumMuls = () => {
    let sum = 0;
    for (const match of instancesOfMul) {
        sum += parseInt(match[3]) * parseInt(match[4]);
    }
    return sum;
}

const regexWithOtherInstructions = /((mul\()(\d{1,3}),(\d{1,3})\))|(don\'t\(\))|(do\(\))/g;

const parseInstructions = (instructions) => {
    let sum = 0;
    let enabled = true
    for (const match of instructions.matchAll(regexWithOtherInstructions)) {
        if (match[5] == 'don\'t()') {
            enabled = false;
        }
        if (match[6] == 'do()') {
            enabled = true;
        }

        if (enabled && match[2] == 'mul(') {
            sum += parseInt(match[3]) * parseInt(match[4]);
        }
    }
    return sum;
}
// part 1
console.log(sumMuls());

//part 2
console.log(parseInstructions(input));