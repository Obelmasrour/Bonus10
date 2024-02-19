import { setPagination } from './setPagination';

// Mock setCurrentPage and setNumberPages functions
jest.mock('./setCurrentPage', () => ({
  setCurrentPage: jest.fn(({ max, skip }) => Math.ceil(skip / max)),
}));

jest.mock('./setNumberPages', () => ({
  setNumberPages: jest.fn(({ total, max }) => Math.ceil(total / max)),
}));

describe('setPagination', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return pagination object with default values', () => {
    const result = setPagination({});
    expect(result.total).toBe(1);
    expect(result.numberItems).toBe(1);
    expect(result.numberPages).toBe(1);
    expect(result.currentPage).toBe(1);
  });

  it('should calculate currentPage and numberPages correctly', () => {
    const result = setPagination({ total: 20, skip: 10, max: 5 });
    expect(result.currentPage).toBe(3); // 10 / 5 = 2, rounded up to nearest integer
    expect(result.numberPages).toBe(4); // 20 / 5 = 4
  });

  it('should use custom setCurrentPage and setNumberPages functions', () => {
    const mockSetCurrentPage = jest.fn();
    const mockSetNumberPages = jest.fn();
    setPagination({
      total: 20,
      skip: 10,
      max: 5,
      setCurrentPageFn: mockSetCurrentPage,
      setNumberPagesfn: mockSetNumberPages,
    });
    expect(mockSetCurrentPage).toHaveBeenCalled();
    expect(mockSetNumberPages).toHaveBeenCalled();
  });
});
