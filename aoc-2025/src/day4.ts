import path from "path";
import { read } from "./lib/readFile";

function parseToArray(str: string): string[][] {
  const temp: string[] = str.split("\n");
  const arr: string[][] = [];

  for (const row of temp) arr.push(row.split(""));

  return arr;
}

async function main() {
  const filePath = path.join(__dirname, "../assets/day4/sample.txt");
  const contents = await read(filePath);

  const res = parseToArray(contents);
  console.log(res);
}

main();
