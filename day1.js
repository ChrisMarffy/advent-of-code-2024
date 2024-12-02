const fs = require("fs");
const input_array = fs.readFileSync("day1-input.txt").toString().split("\n");
// const input_array = fs.readFileSync("day1-example-input.txt").toString().split("\n");


const columns = input_array.reduce((acc, row) => {
    values = row.split("   ");
    acc.listA.push(values[0]);
    acc.listB.push(values[1]);
    return acc;
}, {listA: [], listB: []});

const sortedLists =  () => {
    return {
        listA: columns.listA.sort((a, b) => a - b),
        listB: columns.listB.sort((a, b) => a - b)
    }
}

const distances = () => {
    const sorted = sortedLists();
    const listA = sorted.listA;
    const listB = sorted.listB;
    const distance = listA.map((value, index) => {
        return Math.abs(value - listB[index]);
    });
    return distance;
}

const totalDistance = () => {
    return distances().reduce((acc, value) => acc + value, 0);
}

const numAppearances = (num, list) => {
    return list.filter(value => value === num).length;
}


const timesAappearsInB = () => {
    const sorted = sortedLists();
    const listA = sorted.listA;
    const listB = sorted.listB;
    const times = listA.map((value) => {
        return numAppearances(value, listB);
    });
    return times;
}

const similarityScores = () => {
    const sorted = sortedLists();
    const listA = sorted.listA;

    return timesAappearsInB().map((value, index) => {
        return value * listA[index];
    });
}

const similarityScore = () => {
    return similarityScores().reduce((acc, value) => acc + value, 0);
}

// console.log(totalDistance());
console.log(similarityScore());
