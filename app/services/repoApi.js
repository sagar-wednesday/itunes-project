import { generateApiClient } from '@utils/apiUtils';

const repoApi = generateApiClient('github');

const tracksApi = generateApiClient('iTunes');

export const getRepos = (repoName) => repoApi.get(`/search/repositories?q=${repoName}`);

export const getTracks = (trackName) => tracksApi.get(`/search?term=${trackName}`);
