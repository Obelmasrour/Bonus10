import { setCurrentPage } from '../setCurrentPage.js';

describe('setCurrentPage', () => {
  it('should calculate the correct current page when max and skip are provided', () => {
    const result = setCurrentPage({ max: 10, skip: 20 });
    expect(result).toEqual(2); // 20 / 10 = 2
  });

  it('should default to 1 when max is 0', () => {
    const result = setCurrentPage({ max: 0, skip: 20 });
    expect(result).toEqual(1);
  });

  it('should default to 1 when max is not provided', () => {
    const result = setCurrentPage({ skip: 20 });
    expect(result).toEqual(1); 
  });

  it('should default to 1 when skip is not provided', () => {
    const result = setCurrentPage({ max: 10 });
    expect(result).toEqual(1); 
  });

  it('should default to 1 when both max and skip are not provided', () => {
    const result = setCurrentPage({});
    expect(result).toEqual(1); 
  });
});

