import { computeDataError } from './computeDataError';
import { STATUS_API } from './setResponseError';
import { setResponseError } from './setResponseError';


export const buildResponse = async (
  response,
  config,
  computeDataErrorFn = computeDataError,
) => {
  const { status } = response;
  switch (true) {
    case `${status}`.startsWith(`${STATUS_API.ERROR}`):
    case `${status}`.startsWith(`${STATUS_API.WARNING}`): {
      throw await computeDataErrorFn(response);
    }
    case `${status}` === `${STATUS_API.SUCCESS}`:
      if (config.blob) {
        return response.blob();
      }
      if (config.text) {
        return response.text();
      }
      return {
        ...(await response.json()),
        statusHttp: status,
      };
    default:
      return {
        statusHttp: status,
      };
  }
};



// Mocking setResponseError function
jest.mock('./setResponseError', () => ({
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