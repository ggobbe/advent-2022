const WORD_SIZE = 4;

const input = await Deno.readTextFile("./inputs/input6");
const buffer = input.trim();

const chars = buffer.split("");

const firstWordIndex = chars.findIndex((_, index) => {
  const copy = [...chars];
  const word = copy.splice(index, WORD_SIZE);

  const unique = new Set(word);

  return unique.size === WORD_SIZE;
});

console.log(firstWordIndex + WORD_SIZE);
