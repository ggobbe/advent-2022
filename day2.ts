type Shape = "rock" | "scissors" | "paper";
type Game = { ennemy: Shape; outcome: Outcome };
type Outcome = "win" | "lose" | "draw";

const ennemyMap: Record<string, Shape> = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const outcomeMap: Record<string, Outcome> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const wins: Record<Shape, Shape> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const looses: Record<Shape, Shape> = {
  scissors: "rock",
  rock: "paper",
  paper: "scissors",
};

const shapeScore: Record<Shape, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const input = await Deno.readTextFile("./input2");
const lines = input.split("\n");

const strategy: Game[] = lines
  // remove invalid lines
  .filter((l) => /^([A|B|C]) ([X|Y|Z])$/.test(l))

  // parse strategy
  .map((l) => {
    const match = l.match(/^([A|B|C]) ([X|Y|Z])$/);
    if (!match) {
      throw new Error("did not match");
    }
    return {
      ennemy: ennemyMap[match[1]] as Shape,
      outcome: outcomeMap[match[2]] as Outcome,
    };
  });

let score = 0;

for (const game of strategy) {
  const { outcome, ennemy } = game;

  let player: Shape;
  switch (outcome) {
    case "draw":
      player = ennemy;
      score += 3;
      break;
    case "win":
      player = looses[ennemy];
      score += 6;
      break;
    case "lose":
      player = wins[ennemy];
      score += 0;
      break;
    default:
      throw new Error("unknown outcome");
  }

  score += shapeScore[player];
}

console.log(`score: ${score}`);
