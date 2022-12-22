import { chunk } from "https://deno.land/std@0.150.0/collections/chunk.ts";

const input = await Deno.readTextFile("./inputs/input5");
const lines = input.split("\n");

const positions = lines.filter((l) => /^\s*(\[[A-Z]\]\s*)+$/.test(l));
const movements = lines.filter((l) => /^move/.test(l));

const stacks = buildStacks(positions);
applyMovements(stacks, movements);

const firsts = stacks.map((s) => s[s.length - 1]);

console.log(firsts.join(""));

function buildStacks(positions: string[]) {
  const stacks: Array<Array<string>> = [];
  for (const position of positions) {
    const chars = position.split("");
    const chunks = chunk(chars, 4);
    const crates = chunks.map((c) => c[1]);

    for (let i = 0; i < crates.length; i++) {
      stacks[i] ??= [];
      if (crates[i].trim()) {
        stacks[i].push(crates[i]);
      }
    }
  }

  return stacks.map((s) => s.reverse());
}

function applyMovements(stacks: Array<Array<string>>, movements: string[]) {
  for (const movement of movements) {
    const moveGroups = movement.match(/^move (\d+) from (\d+) to (\d+)$/);
    if (!moveGroups) {
      continue;
    }

    const [_, amountTxt, sourceTxt, targetTxt] = moveGroups;
    const amount = +amountTxt;
    const sourceIndex = +sourceTxt - 1;
    const targetIndex = +targetTxt - 1;

    const pickCrates = stacks[sourceIndex].splice(
      stacks[sourceIndex].length - amount,
      amount
    );

    stacks[targetIndex].push(...pickCrates);
  }
}
