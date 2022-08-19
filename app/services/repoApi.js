import { generateApiClient } from '@utils/apiUtils';

const tracksApi = generateApiClient('iTunes');

export const getTracks = (trackName) => tracksApi.get(`/search?term=${trackName}`);
export const getTrackDetails = (trackId) => tracksApi.get(`/lookup?id=${trackId}`);
