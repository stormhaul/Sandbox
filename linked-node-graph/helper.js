function genRandNum(start, end, step = 1) {
  let magnitude = Math.abs(end - start);
  let seed = Math.random();
  console.log(start, magnitude, seed, '=', Math.floor(seed * magnitude + start));
  return Math.floor(Math.random() * magnitude + start);
}
