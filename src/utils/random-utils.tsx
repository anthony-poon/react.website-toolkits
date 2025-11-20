import _ from "lodash";

const char = (min: number, max: number, length: number) => {
  const char = [];
  for (let i = 0; i < length; i++) {
    char.push(String.fromCharCode(Math.random() * (max - min) + min));
  }
  return char.join("");
};

const password = () => {
  const lower = char(97, 123, 7);
  const upper = char(65, 91, 7);
  const number = char(48, 58, 4);
  const special = char(33, 47, 2);
  const str = lower + upper + number + special;
  return _.shuffle(str.split("")).join("");
};

export const RandomUtils = {
  password: password,
  char: char,
};
