import { STATUS_HTTP_MESSAGES, setResponseError } from './setResponseError';

export const computeDataError = async (
  response,
  setResponseErrorFn = setResponseError,
) => {
  try {
    const data = await response.json();
    return setResponseErrorFn({
      response: { ...data, status: response.status },
    });
  } catch (error) {
    return setResponseErrorFn({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[response.status] },
        status: response.status,
      },
    });
  }
};
