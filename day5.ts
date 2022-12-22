import { chunk } from "https://deno.land/std@0.150.0/collections/chunk.ts";

const input = await Deno.readTextFile("./inputs/input5");
const lines = input.split("\n");

const stacks: Array<Array<string>> = [];

lines.map((l) => {
  const chars = l.split("");
  const chunks = chunk(chars, 4);
  const crates = chunks.map((c) => c[1]);

  if (/^\s*(\[[A-Z]\]\s*)+$/.test(l)) {
    for (let i = 0; i < crates.length; i++) {
      stacks[i] ??= [];
      if (crates[i].trim()) {
        stacks[i].push(crates[i]);
      }
    }
  }

  if (/^(\s[1-9]\s+)+$/.test(l)) {
    for (let i = 0; i < stacks.length; i++) {
      stacks[i] = stacks[i].reverse();
    }
  }

  const moveGroups = l.match(/^move (\d+) from (\d+) to (\d+)$/);
  if (moveGroups) {
    const [_, amountTxt, sourceTxt, targetTxt] = moveGroups;
    const amount = +amountTxt;
    const source = +sourceTxt - 1;
    const target = +targetTxt - 1;

    for (let x = 0; x < amount; x++) {
      const out = stacks[source].pop();
      stacks[target].push(out ?? "0");
    }
  }
});

const firsts = stacks.map(s => s[s.length - 1]);

console.log(firsts.join(''));
