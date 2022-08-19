import NotFound from '@containers/NotFoundPage/Loadable';
import routeConstants from '@utils/routeConstants';
import SearchTrackContainer from '@app/containers/TrackContainer/Loadable';
import TrackDetailsContainer from '@app/containers/TrackContainer/TrackDetailsContainer/index';

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
