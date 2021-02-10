import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Podcasts } from '../pages/listener/podcasts';
import { useMe } from '../hooks/useMe'
import { UserRole } from '../__generated__/globalTypes';
import { CreatePodcast } from '../pages/host/create-podcast';
import { CreateEpisode } from '../pages/host/create-episode';
import { Episodes } from '../pages/listener/episodes';
import { Podcast } from '../pages/listener/podcast';
import { Episode } from '../pages/listener/episode';
import { Header } from '../components/header';

const CommonRoutes = [
  <Route path="/" key={101} exact>
    <Podcasts />
  </Route>,
  <Route path="/podcast/:id" key={102} >
    <Podcast />
  </Route>,
  <Route path="/episode/:podcastId" key={104} >
    <Episode />
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
  console.log(data);
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