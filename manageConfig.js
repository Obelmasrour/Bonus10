const API_URL = {
  BASE: 'base',
  GITHUB: 'github',
};

const manageConfig = (apiName, fetchAuthConfig) => {
  const { headers, ...restFetchAuthConfig } = fetchAuthConfig;
  return apiName === API_URL.BASE
    ? { headers, ...restFetchAuthConfig }
    : restFetchAuthConfig;
};

export default manageConfig;
