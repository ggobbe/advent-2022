const input = await Deno.readTextFile("./inputs/input3");
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
      // find ID present in both parts
      .filter((l) => right.some((r) => r === l))

      // remove duplicates
      .filter(removeDuplicates)

      // convert to numbers
      .map(letterToNumber)

      // sum
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return doubles;
  })

  // sum
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(total);
