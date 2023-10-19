import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiRootUrl } from 'common/utils/network/endpoints';

const baseQuery = fetchBaseQuery({
  baseUrl: apiRootUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json, text/plain, */*');

    return headers;
  },
});

export default baseQuery;
