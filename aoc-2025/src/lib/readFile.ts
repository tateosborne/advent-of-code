import { open } from "fs/promises";

async function read(fp: string): Promise<string> {
  const f = await open(fp);
  const fileContents = await f.readFile({ encoding: "utf8" });
  const contents = String(fileContents);
  await f.close();

  return contents;
}

export { read };
