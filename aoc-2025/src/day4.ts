import path from "path";
import { read } from "./lib/readFile";


async function main() {
  const filePath = path.join(__dirname, "../assets/day4/sample.txt");
  const contents = await read(filePath);
  console.log(contents);
}

main();
