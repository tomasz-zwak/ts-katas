"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
describe("Matrix", function () {
    var matrix = "9 8 7\n5 3 2\n6 6 7";
    test("should return a list of rows top to bottom", function () {
        expect((0, matrix_1.matrixParser)(matrix).rows).toEqual([
            [9, 8, 7],
            [5, 3, 2],
            [6, 6, 7],
        ]);
    });
    test("should return a list of columns left to right", function () {
        expect((0, matrix_1.matrixParser)(matrix).columns).toEqual([
            [9, 5, 6],
            [8, 3, 6],
            [7, 2, 7],
        ]);
    });
    test('should not have dimensions', function () {
        var m = (0, matrix_1.matrixParser)(matrix).dimensions;
        expect(m === null || m === void 0 ? void 0 : m.height).toBeFalsy();
        expect(m === null || m === void 0 ? void 0 : m.width).toBeFalsy();
        expect;
    });
});
