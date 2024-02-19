import { computeDataError } from '../computeDataError.js';
import { setResponseError } from '../setResponseError.js';

// Mocking setResponseError function
jest.mock('../setResponseError.js', () => ({
  setResponseError: jest.fn(),
}));

// Mocking response object
const mockResponse = {
  status: 404,
  json: jest.fn(() => ({ error: 'Not found' })),
};

describe('computeDataError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful response', async () => {
    // Set up mock data
    mockResponse.status = 200;
    mockResponse.json.mockResolvedValue({ success: true });

    // Call computeDataError function
    await computeDataError(mockResponse);

    // Check if setResponseError was called with the expected parameters
    expect(setResponseError).toHaveBeenCalledWith({
      response: { success: true, status: 200 },
    });
  });

  it('should handle response with JSON data', async () => {
    // Set up mock data
    mockResponse.status = 404;
    mockResponse.json.mockRejectedValue(new Error('Parsing failed'));

    // Call computeDataError function
    await computeDataError(mockResponse);

    // Check if setResponseError was called with the expected parameters
    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: 'Not Found' }, // Assuming STATUS_HTTP_MESSAGES[404] is 'Not Found'
        status: 404,
      },
    });
  });

  it('should handle response with parsing error', async () => {
    // Set up mock data
    mockResponse.status = 500;
    mockResponse.json.mockRejectedValue(new Error('Parsing failed'));

    // Call computeDataError function
    await computeDataError(mockResponse);

    // Check if setResponseError was called with the expected parameters
    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: 'Internal Server Error' }, // Assuming STATUS_HTTP_MESSAGES[500] is 'Internal Server Error'
        status: 500,
      },
    });
  });
});
import { computeDataError } from '../computeDataError.js'; // Assurez-vous que le chemin d'importation est correct

jest.mock('../setResponseError.js', () => ({
  setResponseError: jest.fn(),
}));

describe('computeDataError', () => {
  it('should...', () => {
    // Vos tests ici
  });
});

