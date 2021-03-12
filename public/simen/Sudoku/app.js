const inputTable = document.getElementById("inputTable");
const outputTable = document.getElementById("outputTable");

let grid = [
    [2, 0, 3, 0, 0, 8, 6, 0, 7],
    [1, 4, 0, 7, 2, 6, 0, 0, 9],
    [5, 0, 7, 1, 3, 9, 4, 2, 8],
    [0, 2, 5, 0, 8, 1, 9, 0, 4],
    [4, 1, 0, 9, 0, 3, 2, 0, 5],
    [0, 7, 9, 2, 0, 5, 0, 3, 6],
    [6, 0, 2, 0, 1, 0, 0, 9, 3],
    [7, 0, 0, 5, 0, 2, 0, 0, 1],
    [0, 8, 1, 3, 6, 7, 0, 4, 0]
];

const solveSudoku = grid => {
    let emptySpot = empty(grid);
    let p = emptySpot[0];
    let q = emptySpot[1];

    if (!isValidSudoku(grid)) return grid;

    if (p === -1) {
        return grid;
    };

    let possArr = possiblities(p, q, grid);

    for (let k = 0; k < possArr.length && empty(grid)[0] !== -1; k++) {
        grid[p][q] = possArr[k];
        solveSudoku(grid);
    }

    if (empty(grid)[0] !== -1) grid[p][q] = 0;

    return grid;
}

const empty = grid => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) return [i, j];
        }
    }
    return [-1, -1];
}

const possiblities = (p, q, grid) => {
    let possArr = [];
    let row = [];
    let col = [];
    let quad = [];
    let k = 0;
    let l = 0;
    if (p <= 2) k = 0;
    else if (p <= 5) k = 3;
    else k = 6;
    if (q <= 2) l = 0;
    else if (q <= 5) l = 3;
    else l = 6;

    for (let i = 0; i < 9; i++) {
        row.push(grid[i][q]);
    }
    for (let j = 0; j < 9; j++) {
        col.push(grid[p][j]);
    }
    for (let i = k; i < k + 3; i++) {
        for (let j = l; j < l + 3; j++) {
            quad.push(grid[i][j]);
        }
    }

    for (let n = 1; n < 10; n++) {
        if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
            possArr.push(n);
        }
    }
    return possArr;
}
const checkQuadrant = (p, q, grid) => {
    let quadrant = [];
    for (let i = p; i < p + 3; i++) {
        for (let j = q; j < q + 3; j++) {
            if (quadrant.indexOf(grid[i][j]) === -1 || grid[i][j] === 0) {
                quadrant.push(grid[i][j]);
            } else {
                return false;
            }
        }
    }
    return true;
}
const isValidSudoku = grid => {
    if (!checkQuadrant(0, 0, grid)) return false;
    if (!checkQuadrant(0, 3, grid)) return false;
    if (!checkQuadrant(0, 6, grid)) return false;
    if (!checkQuadrant(3, 0, grid)) return false;
    if (!checkQuadrant(3, 3, grid)) return false;
    if (!checkQuadrant(3, 6, grid)) return false;
    if (!checkQuadrant(6, 0, grid)) return false;
    if (!checkQuadrant(6, 3, grid)) return false;
    if (!checkQuadrant(6, 6, grid)) return false;

    for (let i = 0; i < grid.length; i++) {
        let rows = [];
        for (let j = 0; j < grid.length; j++) {
            if (rows.indexOf(grid[i][j]) === -1 || grid[i][j] === 0) {
                rows.push(grid[i][j]);
            } else {
                return false;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        let cols = [];
        for (let j = 0; j < grid.length; j++) {
            if (cols.indexOf(grid[j][i]) === -1 || grid[j][i] === 0) {
                cols.push(grid[j][i]);
            } else {
                return false;
            }
        }
    }
    return true;
}

const displayTable = table => {
    for(let i = 0; i<grid.length; i++) {
        let tr = document.createElement("tr")
        for(let j = 0; j<grid[i].length; j++) {
            let td = document.createElement("td");
            let tdVal = document.createTextNode(grid[i][j] == 0 ? '': grid[i][j]);
            td.appendChild(tdVal)
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
}

displayTable(inputTable)
solveSudoku(grid);
displayTable(outputTable)