import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchTrackContainer from '@containers/SearchTrackContainer/Loadable';

export const routeConfig = {
  tracks: {
    component: SearchTrackContainer,
    ...routeConstants.tracks
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
