import json from './json';

// eslint-disable-next-line import/prefer-default-export

export { json };

export const randomInt = (low, high) =>
  Math.floor(Math.random() * (high - low) + low);

export const randomVerifiedCode = () => randomInt(1000, 9999);
