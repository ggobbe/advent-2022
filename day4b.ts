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

const overlapAtAll = (range1: Range, range2: Range) => {
  return (
    (range1.low <= range2.low && range1.high >= range2.low) ||
    (range2.low <= range1.low && range2.high >= range1.low)
  );
};

const overlappingPairs = lines
  .filter((line) => line.trim())
  .map((line) => line.split(","))
  .map((pair) => pair.map(parseRange))
  .filter((pair) => overlapAtAll(pair[0], pair[1]));

console.log("pairs:", overlappingPairs.length);
