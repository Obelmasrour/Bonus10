import { setNumberPages } from '../setNumberPages.js';

describe('setNumberPages', () => {
  it('should calculate the correct number of pages when total and max are provided', () => {
    const result = setNumberPages({ total: 20, max: 5 });
    expect(result).toEqual(3); // (20 / 5 ) -1 = 3
  });

  it('should default to 1 when max is 0', () => {
    const result = setNumberPages({ total: 20, max: 0 });
    expect(result).toEqual(Infinity);
  });

  it('should default to 1 when max is not provided', () => {
    const result = setNumberPages({ total: 20 });
    expect(result).toEqual(19);
  });

  it('should default to 1 when both total and max are not provided', () => {
    const result = setNumberPages({});
    expect(result).toEqual(1);
  });

  it('should default to 1 when max and total are both 0', () => {
    const result = setNumberPages({ total: 0, max: 0 });
    expect(result).toEqual(1);
  });


});

