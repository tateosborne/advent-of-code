import path from "path";
import { read } from "./lib/readFile";


type Offset = { di: number; dj: number };

const OFFSETS: Offset[] = [
  { di: -1, dj: -1 },
  { di: -1, dj: 0 },
  { di: -1, dj: 1 },
  { di: 0, dj: -1 },
  { di: 0, dj: 1 },
  { di: 1, dj: -1 },
  { di: 1, dj: 0 },
  { di: 1, dj: 1 },
] as const;

function parseGrid(str: string): string[][] {
  const temp: string[] = str.split("\n");
  const grid: string[][] = [];

  for (const row of temp) grid.push(row.split(""));

  return grid;
}

function findAccessibleRolls(grid: string[][]): number {
  const isOutOfBounds = (i: number, j: number, offset: Offset) => {
    if (
      i + offset.di < 0 ||
      i + offset.di >= grid.length ||
      j + offset.dj < 0 ||
      j + offset.dj >= grid[i].length
    )
      return true;

    return false;
  };

  let total = 0;
  let gridCopy = grid.map(row => [...row]);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let neighbours = 0;

      if (grid[i][j] != "@") continue;

      for (const offset of OFFSETS) {
        if (isOutOfBounds(i, j, offset)) continue;

        if (grid[i + offset.di][j + offset.dj] == "@") {
          neighbours = neighbours + 1;
        }
      }

      if (neighbours < 4) {
        total = total + 1;
        gridCopy[i][j] = "x";
      }
    }
  }

  return total;
}

async function main() {
  const filePath = path.join(__dirname, "../assets/day4/sample.txt");
  const contents = await read(filePath);

  const grid = parseGrid(contents);
  const res = findAccessibleRolls(grid);

  console.log(res);
}

main();
