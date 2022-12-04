const input = await Deno.readTextFile("./input4");
const lines = input.split("\n");

type Range = {
  low: number;
  high: number;
};

const parseRange = (range: string): Range => {
  if (!/^\d+-\d+$/.test(range)) {
    throw new Error(`invalid range: ${range}`);
  }

  const [low, high] = range.split("-");
  return {
    low: +low,
    high: +high,
  };
};

const rangeOverlap = (range1: Range, range2: Range) => {
  return (
    (range1.low <= range2.low && range1.high >= range2.high) ||
    (range2.low <= range1.low && range2.high >= range1.high)
  );
};

const overlappingPairs = lines
  // remove empty lines
  .filter((line) => line.trim())

  // split comma separated pairs
  .map((line) => line.split(","))

  // parse pairs' ranges
  .map((pair) => pair.map(parseRange))

  // keep pairs with full overlap
  .filter((pair) => rangeOverlap(pair[0], pair[1]));

console.log("pairs:", overlappingPairs.length);
