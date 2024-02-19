export const setNumberPages = ({ total = 1, max = 1 }) =>
  Math.ceil(max >= total ? 1 : Number(total / max) - 1);
