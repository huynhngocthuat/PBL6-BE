function json(input) {
  if (input === null || input === undefined) {
    return null;
  }
  return JSON.parse(JSON.stringify(input));
}

export default json;
