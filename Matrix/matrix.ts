type MatrixDimensions = {
  height: number;
  width: number;
};

type Matrix = {
  rows: Array<number[]>;
  columns: Array<number[]>;
  dimensions?: MatrixDimensions;
};

function rowToNumArr(row: string): number[] {
  return row.split(" ").map((el) => parseInt(el));
}

function getMatrixDimensions(matrixNum: number[][]): MatrixDimensions {
  return { height: matrixNum.length, width: matrixNum[0].length };
}

function strMatrixToNum(matrix: string): number[][] {
  return matrix.split("\n").map(rowToNumArr);
}

export function matrixParser(matrix: string): Matrix {
  const matrixNum = strMatrixToNum(matrix);
  const rows = matrixNum;
  const columns: number[][] = [];

  const dimensions = getMatrixDimensions(matrixNum);

  for (let i = 0; i < dimensions.width; i++) {
    let col = [];
    for (let j = 0; j < dimensions.height; j++) {
      console.log(`rows ${j} and ${i} = ${rows[j][i]} || ${col}`);
      col.push(rows[j][i]);
    }
    columns.push(col);
  }

  return { rows, columns };
}
