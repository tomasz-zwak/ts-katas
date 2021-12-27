"use strict";
exports.__esModule = true;
exports.matrixParser = void 0;
function rowToNumArr(row) {
    return row.split(" ").map(function (el) { return parseInt(el); });
}
function getMatrixDimensions(matrixNum) {
    return { height: matrixNum.length, width: matrixNum[0].length };
}
function strMatrixToNum(matrix) {
    return matrix.split("\n").map(rowToNumArr);
}
function matrixParser(matrix) {
    var matrixNum = strMatrixToNum(matrix);
    var rows = matrixNum;
    var columns = [];
    var dimensions = getMatrixDimensions(matrixNum);
    for (var i = 0; i < dimensions.width; i++) {
        var col = [];
        for (var j = 0; j < dimensions.height; j++) {
            col.push(rows[j][i]);
        }
        columns.push(col);
    }
    return { rows: rows, columns: columns };
}
exports.matrixParser = matrixParser;
