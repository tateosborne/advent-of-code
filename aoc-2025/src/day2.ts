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
    await f.close();

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


function countInvalidIds(ranges: Array<Range>, regex: RegExp): number {
    let total = 0;

    for (const r of ranges) {

        for (let i=r.lower; i<=r.upper; i++) {
            const i_str = i.toString();

            if (i_str.match(regex)) {
                total = total + i;
            }
        }
    }

    return total;
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day2/input.txt");
    let contents = await readInput(filePath);
    const ranges = parseContents(contents);
    const regex1 = /\b(\d+)\1\b/;
    const regex2 = /\b(\d+)\1+\b/;
    const res = countInvalidIds(ranges, regex2);

    console.log(res)
}

main()
