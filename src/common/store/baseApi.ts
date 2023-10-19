import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from 'common/store/baseQuery';

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
