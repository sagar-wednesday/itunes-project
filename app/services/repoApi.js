import { generateApiClient } from '@utils/apiUtils';

const tracksApi = generateApiClient('iTunes');

export const getTracks = (trackName) => tracksApi.get(`/search?term=${trackName}`);
