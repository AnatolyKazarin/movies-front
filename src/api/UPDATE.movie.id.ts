import { appInstance, BASE_URL } from '@/api/index';

export const updateMovieRequest = ({ id, data }: { id: number; data: FormData }) =>
  appInstance.patch(`${BASE_URL}/movies/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
