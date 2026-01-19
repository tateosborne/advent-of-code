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


function countInvalidIds(ranges: Array<Range>, part: Number): number {
    let total = 0;

    if (part == 1) {
        for (const r of ranges) {

            for (let i=r.lower; i<=r.upper; i++) {
                const i_str = i.toString();
                const length = i_str.length;

                if (length % 2 == 0) {
                    const left = i_str.substring(0, length/2);
                    const right = i_str.substring(length/2);

                    if (left == right) {
                        total = total + i;
                    }
                }
            }
        }
    } else {
        const regex = /\b(\d+)\1+\b/;
        for (const r of ranges) {

            for (let i=r.lower; i<=r.upper; i++) {
                const i_str = i.toString();

                if (i_str.match(regex)) {
                    total = total + i;
                }
            }
        }

    }

    return total;
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day2/input.txt");
    let contents = await readInput(filePath);
    const ranges = parseContents(contents);
    const res = countInvalidIds(ranges, 2);

    console.log(res)
}

main()
