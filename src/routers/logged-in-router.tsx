import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Podcasts } from '../pages/listener/podcasts';
import { useMe } from '../hooks/useMe'
import { UserRole } from '../__generated__/globalTypes';
import { CreatePodcast } from '../pages/host/create-podcast';
import { CreateEpisode } from '../pages/host/create-episode';
import { Podcast } from '../pages/listener/podcast';
import { Episode } from '../pages/listener/episode';
import { Header } from '../components/header';
import { EditProfile } from '../pages/user/edit-profile';
import { SearchPodcasts } from '../pages/listener/search-podcasts';

const CommonRoutes = [
  <Route path="/" key={101} exact>
    <Podcasts />
  </Route>,
  <Route path="/edit-profile" key={102} exact>
    <EditProfile />
  </Route>,
  <Route path="/podcast/:id" key={103} >
    <Podcast />
  </Route>,
  <Route path="/episode/:episodeId" key={104} >
    <Episode />
  </Route>,
  <Route path="/search" key={104} >
    <SearchPodcasts />
  </Route>,
]

const ListenerRoutes = [
  ...CommonRoutes
];
const HostRoutes = [
  ...CommonRoutes,
  <Route path="/create-new-podcast" key={1} exact>
    <CreatePodcast />
  </Route>,
  <Route path="/create-new-episode/:podcastId" key={2} exact>
    <CreateEpisode />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return <div className="h-screen flex justify-center items-center font-semibold text-xl tracking-wide">Loading ...</div>
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Listener && ListenerRoutes}
        {data.me.role === UserRole.Host && HostRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}