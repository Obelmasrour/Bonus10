import manageConfig, { API_URL } from './manageConfig';

describe('manageConfig', () => {
  it('should return the fetchAuthConfig object as is for API_URL.BASE', () => {
    const fetchAuthConfig = {
      headers: {
        Authorization: 'Bearer token',
      },
      method: 'GET',
    };
    const result = manageConfig(API_URL.BASE, fetchAuthConfig);
    expect(result).toEqual(fetchAuthConfig);
  });

  it('should remove the headers from fetchAuthConfig for other API_URLs', () => {
    const fetchAuthConfig = {
      headers: {
        Authorization: 'Bearer token',
      },
      method: 'GET',
    };
    const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);
    expect(result).toEqual({ method: 'GET' });
  });

  it('should handle fetchAuthConfig without headers', () => {
    const fetchAuthConfig = {
      method: 'GET',
    };
    const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);
    expect(result).toEqual({ method: 'GET' });
  });

  it('should handle empty fetchAuthConfig', () => {
    const fetchAuthConfig = {};
    const result = manageConfig(API_URL.GITHUB, fetchAuthConfig);
    expect(result).toEqual({});
  });
});
