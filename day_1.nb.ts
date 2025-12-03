
//#nbts@code
// 0. Helper functions

const log = <T extends unknown[]>(...data: T) => (console.log(...data), data);
const mod = (a: number, b: number) => ((a % b) + b) % b;
//#nbts@code
// 1. Preprocess data

const exampleRawData = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.slice(1, -1);

const rawData = await Deno.readTextFile("day_1.txt");

function preprocess(rawData: string) {
  return rawData
    .split("\n")
    .map((e) => (e[0] === "R" ? 1 : -1) * +e.slice(1));
}
//#nbts@code
function part1(data: ReturnType<typeof preprocess>) {
  let pos = 50;
  let password = 0;
  for (const dist of data) {
    pos = (pos + dist) % 100;
    if (pos === 0) password += 1;
  }
  return password;
}

log(
  part1(
    preprocess(
      // exampleRawData,
      rawData,
    ),
  ),
);

//#nbts@code
function part2(data: ReturnType<typeof preprocess>) {
  let pos = 50;
  let password = 0;
  // log(pos);
  for (const dist of data) {
    const rawPos = pos + dist;
    if (pos !== 0 && (rawPos >= 100 || rawPos <= 0)) {
      password += 1 + Math.floor(Math.abs(dist / 100));
    }
    // log(password, rawPos);
    pos = mod(rawPos, 100);
  }
  return password;
}

log(
  part2(
    preprocess(
      // exampleRawData,
      rawData,
    ),
  ),
);
