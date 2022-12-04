const input = await Deno.readTextFile("./input1");

const groups = input.split("\n\n");

const totals = [];

for (const group of groups) {
  const numbers = group.split("\n").map((x) => +x);
  totals.push(sumOf(numbers));
}

const sorted = totals.sort((a, b) => b - a);

const firstThree = sorted.slice(0, 3);

console.log(sumOf(firstThree));

function sumOf(numbers: number[]) {
  return numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
