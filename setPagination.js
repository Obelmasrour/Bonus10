import { setCurrentPage } from './setCurrentPage';
import { setNumberPages } from './setNumberPages';

export const setPagination = ({
  total = 1,
  skip = 1,
  max = 1,
  setCurrentPageFn = setCurrentPage,
  setNumberPagesfn = setNumberPages,
}) => ({
  total: Number(total),
  numberItems: Number(max),
  numberPages: setNumberPagesfn({ total, max }),
  currentPage: setCurrentPageFn({ max, skip }),
});
