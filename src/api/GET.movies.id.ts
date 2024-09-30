import { appInstance, BASE_URL } from '@/api/index';

export const fetchMovieRequest = (id: number) => appInstance.get(`${BASE_URL}/movies/${id}`);
