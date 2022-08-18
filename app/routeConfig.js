import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchTrackContainer from '@containers/SearchTrackContainer/Loadable';
import TrackDetailsContainer from '@containers/SearchTrackContainer/TrackDetailsContainer/index';

export const routeConfig = {
  tracks: {
    component: SearchTrackContainer,
    ...routeConstants.tracks
  },
  trackDetails: {
    component: TrackDetailsContainer,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
