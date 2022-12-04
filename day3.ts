const input = await Deno.readTextFile("./input3");
const lines = input.split("\n");

const removeDuplicates = (value: string, index: number, self: string[]) => {
  return self.indexOf(value) === index;
};

const letterToNumber = (character: string) => {
  if (/^[a-z]$/.test(character)) {
    return character.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  if (/^[A-Z]$/.test(character)) {
    return character.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }

  throw new Error("unsupported character");
};

const total = lines
  .map((line) => {
    const midPoint = line.length / 2;

    const left = line.slice(0, line.length / 2).split("");
    const right = line.slice(midPoint, line.length).split("");

    const doubles = left
      .filter((l) => right.some((r) => r === l))
      .filter(removeDuplicates)
      .map(letterToNumber)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return doubles;
  })
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(total);
