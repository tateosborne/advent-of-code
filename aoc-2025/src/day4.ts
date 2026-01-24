import path from "path";
import { read } from "./lib/readFile";

interface Coordinate {
    x: number;
    y: number;
};

function parseGrid(str: string): string[][] {
  const temp: string[] = str.split("\n");
  const grid: string[][] = [];

  for (const row of temp) grid.push(row.split(""));

  return grid;
}

function findAccessibleRolls(grid: string[][]): number {
    /**
     * for each element (iterate horizontally)
     * check bordering tiles 
     * early 'continue' if count == 4 
     * if < 4, update running total
     */
    let total = 0;

    const bfs = (curr: Coordinate) => {curr};

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
