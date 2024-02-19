export const setCurrentPage = ({ max, skip }) =>
  (+max !== 0 && Math.ceil(Number(skip / max))) || 1;
