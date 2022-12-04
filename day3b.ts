import { chunk } from "https://deno.land/std@0.150.0/collections/chunk.ts";

const input = await Deno.readTextFile("./input3");
const lines = input.split("\n");

const letterToNumber = (character: string) => {
  if (/^[a-z]$/.test(character)) {
    return character.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }

  if (/^[A-Z]$/.test(character)) {
    return character.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }

  throw new Error("unsupported character");
};

const chunks = chunk(lines, 3).map((c) => c.map((g) => g.split("")));

let score = 0;

score = chunks.reduce((accumulator, chunk) => {
  const sticker = chunk[0].find(
    (c) => chunk[1].includes(c) && chunk[2].includes(c)
  );

  if (sticker) {
    return accumulator + letterToNumber(sticker);
  }

  return accumulator;
}, 0);

console.log(score);
