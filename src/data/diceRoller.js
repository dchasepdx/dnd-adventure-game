export default function diceRoller(sides, number) {
  let result = 0;
  while (number > 0) {
    result += Math.floor(Math.random() * sides + 1);
    number--;

  }
  return result;
};
