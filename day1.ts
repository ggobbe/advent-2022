const input = await Deno.readTextFile("./input1");

const groups = input.split("\n\n");

const total = groups
  // sum each group
  .map((g) =>
    g
      .split("\n")
      .map((x) => +x)
      .reduce((acc, cur) => acc + cur, 0)
  )

  // first 3
  .sort((a, b) => b - a)
  .slice(0, 3)

  // sum
  .reduce((acc, cur) => acc + cur, 0);

console.log(total);
