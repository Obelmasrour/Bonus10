import { isValidDate, formatDate, setDate } from './dateFunctions';

describe('isValidDate', () => {
  it('should return true for valid dates', () => {
    expect(isValidDate('2023-01-15')).toBe(true);
  });

  it('should return false for invalid dates', () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate('')).toBe(false);
    expect(isValidDate('invalid')).toBe(false);
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2023-01-15')).toBe('15/01/2023'); // Assuming locale is 'fr-FR'
  });

  it('should handle empty date', () => {
    expect(formatDate('')).toBe('');
  });

  it('should handle custom locale', () => {
    expect(formatDate('2023-01-15', 'en-US')).toBe('1/15/2023'); // Assuming locale is 'en-US'
  });

  it('should handle custom options', () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    expect(formatDate('2023-01-15', 'fr-FR', options)).toBe('dimanche 15 janvier 2023');
  });
});

describe('setDate', () => {
  it('should return formatted date for valid input', () => {
    expect(setDate({ date: '2023-01-15' })).toBe('15/01/2023'); // Assuming locale is 'fr-FR'
  });

  it('should return empty string for invalid input', () => {
    expect(setDate({ date: null })).toBe('');
    expect(setDate({ date: 'invalid' })).toBe('');
  });

  it('should use custom formatting and validation functions', () => {
    const customFormatDate = jest.fn(() => 'custom formatted date');
    const customIsValidDate = jest.fn(() => true);

    expect(
      setDate({
        date: '2023-01-15',
        formatDateFn: customFormatDate,
        isValidDateFn: customIsValidDate,
      })
    ).toBe('custom formatted date');

    expect(customIsValidDate).toHaveBeenCalledWith('2023-01-15');
    expect(customFormatDate).toHaveBeenCalledWith('2023-01-15');
  });
});
