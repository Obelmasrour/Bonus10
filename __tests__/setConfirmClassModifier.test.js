import { computeDataError } from '../computeDataError.js';
import { setResponseError, STATUS_HTTP_MESSAGES } from '../setResponseError.js';

jest.mock('../setResponseError.js');

describe('computeDataError', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call setResponseError with correct data for a successful response', async () => {
    const response = {
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Success' }),
    };

    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: { message: 'Success', status: 200 },
    });
  });

  it('should call setResponseError with correct data for an error in response.json()', async () => {
    const response = {
      status: 500,
      json: jest.fn().mockRejectedValue(new Error('JSON parsing error')),
    };

    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[500] },
        status: 500,
      },
    });
  });

  it('should call setResponseError with correct data for a non-JSON response', async () => {
    const response = {
      status: 404,
      json: jest.fn().mockRejectedValue(new Error('Not Found')),
    };

    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[404] },
        status: 404,
      },
    });
  });

  it('should allow custom setResponseError function', async () => {
    const customSetResponseErrorFn = jest.fn();
    const response = {
      status: 403,
      json: jest.fn().mockResolvedValue({ error: 'Forbidden' }),
    };

    await computeDataError(response, customSetResponseErrorFn);

    expect(customSetResponseErrorFn).toHaveBeenCalledWith({
      response: { error: 'Forbidden', status: 403 },
    });
  });
});

