import { open } from "fs/promises";
import path from 'path';

interface Range {
    lower: number;
    upper: number;
}

async function readInput(fp: string): Promise<string> {
    const f = await open(fp);
    const fileContents = await f.readFile({ encoding: 'utf8' });
    const contents = String(fileContents);

    return contents;
}


function parseContents(contents: string): Array<Range> {
    const parsed = contents.split(",");
    let ranges: Array<Range> = [];

    for (const p of parsed) {
        let bounds = p.split("-");
        let range = { lower: Number(bounds[0]), upper: Number(bounds[1]) };

        ranges.push(range);
    }

    return ranges;
}


function countInvalidIds(ranges: Array<Range>): number {
    for (const r of ranges) {
        console.log(r);
    }

    return 0;
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day2.txt");
    const contents = await readInput(filePath);
    const ranges = parseContents(contents);

    const res = countInvalidIds(ranges);

    console.log(res)
}

main()
