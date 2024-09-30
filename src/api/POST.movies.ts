import { appInstance, BASE_URL } from '@/api/index';

export const createMovieRequest = (data: FormData) =>
  appInstance.post(`${BASE_URL}/movies`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
