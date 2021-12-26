import { matrixParser } from "./matrix";

describe("Matrix", () => {
  const matrix: string = `9 8 7
5 3 2
6 6 7`;
  test("should return a list of rows top to bottom", () => {
    expect(matrixParser(matrix).rows).toEqual<number[][]>([
      [9, 8, 7],
      [5, 3, 2],
      [6, 6, 7],
    ]);
  });
  test("should return a list of columns left to right", () => {
    expect(matrixParser(matrix).columns).toEqual<number[][]>([
      [9, 5, 6],
      [8, 3, 6],
      [7, 2, 7],
    ]);
  });
});
