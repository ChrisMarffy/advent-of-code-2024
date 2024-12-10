const fs = require("fs");
const rows = fs.readFileSync("day4-input.txt").toString().split("\n");
// const rows = fs.readFileSync("day4-example-input.txt").toString().split("\n");


const letterArrays = rows.map((row) => {
    return row.split("");
});

const columns = letterArrays.reduce((acc, row) => {
    row.forEach((letter, index) => {
        if (!acc[index]) {
            acc[index] = [];
        }
        acc[index].push(letter);
    });
    return acc;
}, []).map((column) => {
    return column.join("");
});

const backDiagonals = () => {
 numDiagonals = columns.length + columns[0].length - 1;
 let diagonals = [];
    for (let i = 0; i < numDiagonals; i++) {
        let xStartPoint = i < columns.length ? i : columns.length - 1;
        let yStartPoint = i < columns.length ? 0 : i - columns.length + 1;
        let diagonal = [];
        for (let j = 0; j < columns[0].length; j++) {
            if (xStartPoint - j >= 0 && yStartPoint + j < columns.length) {
                diagonal.push(columns[xStartPoint - j][yStartPoint + j]);
            }
        }
        diagonals.push(diagonal.join(""));
    }
    return diagonals;
};

frontDiagonals = () => {
    numDiagonals = columns.length + columns[0].length - 1;
    let diagonals = [];
    for (let i = 0; i < numDiagonals; i++) {
        let xStartPoint = i < columns[0].length ? 0 : i - columns[0].length + 1;
        let yStartPoint = i < columns[0].length ? columns[0].length - i - 1 : 0;
        let diagonal = [];
        for (let j = 0; j < columns.length; j++) {
            if (xStartPoint + j < columns.length && yStartPoint + j >= 0 && yStartPoint + j < columns[0].length) {
                diagonal.push(columns[xStartPoint + j][yStartPoint + j]);
            }
        }
        diagonals.push(diagonal.join(""));
    }
    return diagonals;
}

const xmasRegex = /XMAS+/g;
const samxRegex = /SAMX+/g;

const wordSearch = () => {
    count = 0;
    columns.forEach((column) => {
        count += (column.match(xmasRegex) || []).length;
        count += (column.match(samxRegex) || []).length;
    });
    rows.forEach((row) => {
        count += (row.match(xmasRegex) || []).length;
        count += (row.match(samxRegex) || []).length;
    });
    backDiagonals().forEach((diagonal) => {
        count += (diagonal.match(xmasRegex) || []).length;
        count += (diagonal.match(samxRegex) || []).length;
    }
    );
    frontDiagonals().forEach((diagonal) => {
        count += (diagonal.match(xmasRegex) || []).length;
        count += (diagonal.match(samxRegex) || []).length;
    }
    );
    return count;
}   

// part 1
console.log(wordSearch());


const rowsAsArrays = rows.map((row) => {
    return row.split("");
});

const isMas = (string) => {
    return string === "MAS" || string === "SAM";
}

const xmasFinder = () => {
    let count = 0;
    rowsAsArrays.forEach((row, i) => {
        if (i === 0 || i === rowsAsArrays.length - 1) {
            return;
        }
        row.forEach((letter, j) => {
            if (j === 0 || j === row.length - 1) {
                return;
            }
            if ( letter === "A") {
                const topLeft = rowsAsArrays[i-1][j-1];
                const topRight = rowsAsArrays[i-1][j+1];
                const bottomLeft = rowsAsArrays[i+1][j-1];
                const bottomRight = rowsAsArrays[i+1][j+1];
                
                const xString1 = topLeft + letter + bottomRight;
                const xString2 = topRight + letter + bottomLeft;

                if (isMas(xString1) && isMas(xString2)) {
                    count++;
                }
            }
        });
    });
    return count;
}

//part 2
console.log(xmasFinder());