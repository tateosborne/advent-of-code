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
    let total = 0;

    for (const r of ranges) {
        console.log("\nDoing range: " + r.lower + " - " + r.upper);

        for (let i=r.lower; i<=r.upper; i++) {
            console.log(" > " + i);
            const i_str = i.toString();
            const length = i_str.length;

            if (length % 2 == 0) {
                const left = i_str.substring(0, length/2);
                const right = i_str.substring(length/2);
                console.log("   - left=" + left + ", right=" + right);

                if (left == right) {
                    console.log("------------------ADDED");
                    total = total + i;
                }
            }
        }
    }

    return total;
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day2.txt");
    let contents = await readInput(filePath);
    contents = "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
    const ranges = parseContents(contents);
    const res = countInvalidIds(ranges);

    console.log(res)
}

main()
