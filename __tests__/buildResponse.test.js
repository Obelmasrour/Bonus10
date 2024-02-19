import { buildResponse } from '../buildResponse.js';
import { computeDataError } from '../computeDataError.js';
import { STATUS_API } from '../setResponseError.js';

describe('buildResponse', () => {
  // Mocking computeDataError function
  jest.mock('../computeDataError.js', () => ({
    computeDataError: jest.fn(),
  }));

  // Define mock response object
  const mockResponse = {
    status: STATUS_API.SUCCESS,
    json: jest.fn(() => ({ example: 'data' })),
    text: jest.fn(() => 'example text'),
    blob: jest.fn(() => new Blob()),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle ERROR and WARNING status', async () => {
    // Set response status to ERROR
    mockResponse.status = STATUS_API.ERROR;
    
    // Mock computeDataError function behavior
    computeDataError.mockResolvedValue('errorData');
    
    // Call buildResponse function
    await expect(buildResponse(mockResponse, {})).rejects.toEqual('errorData');

    // Set response status to WARNING
    mockResponse.status = STATUS_API.WARNING;

    // Call buildResponse function
    await expect(buildResponse(mockResponse, {})).rejects.toEqual('errorData');

    // Check if computeDataError was called with the response
    expect(computeDataError).toHaveBeenCalledWith(mockResponse);
  });

  it('should handle SUCCESS status with config options', async () => {
    // Set response status to SUCCESS
    mockResponse.status = STATUS_API.SUCCESS;

    // Mock config options
    const config = {
      blob: true,
      text: false,
    };

    // Call buildResponse function with config
    await expect(buildResponse(mockResponse, config)).resolves.toEqual(new Blob());

    // Mock config options
    const config2 = {
      blob: false,
      text: true,
    };

    // Call buildResponse function with config
    await expect(buildResponse(mockResponse, config2)).resolves.toEqual('example text');

    // Call buildResponse function with no config options
    await expect(buildResponse(mockResponse, {})).resolves.toEqual({
      example: 'data',
      statusHttp: STATUS_API.SUCCESS,
    });
  });

  it('should handle unknown status', async () => {
    // Set response status to an unknown status
    mockResponse.status = 'UNKNOWN_STATUS';

    // Call buildResponse function
    await expect(buildResponse(mockResponse, {})).resolves.toEqual({
      statusHttp: 'UNKNOWN_STATUS',
    });
  });
});
