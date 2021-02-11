import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { PODCAST_FRAGMENT } from '../../fragments';
import { podcastsPageQuery } from '../../__generated__/podcastsPageQuery';
import { Podcast } from '../../components/podcast';
import { SearchBar } from '../../components/search-bar';
import { TITLE } from '../../constants';

const PODCASTS_QUERY = gql`
  query podcastsPageQuery {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Podcasts = () => {
  const { data } = useQuery<podcastsPageQuery>(PODCASTS_QUERY);


  return (
    <div>
      <Helmet>
        <title>Home | {`${TITLE}`}</title>
      </Helmet>
      <div className="bg-gradient-to-r from-blue-800 via-violet-800 to-violet-500">
        <SearchBar />
      </div>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto my-8">
        <div className="grid md:grid-cols-4 gap-x-5 gap-y-10 mt-7">
          {data?.getAllPodcasts.podcasts?.map((podcast) => (
            <Podcast
              key={podcast.id}
              id={podcast.id + ''}
              coverImage={podcast.coverImage}
              title={podcast.title}
              categoryName={podcast.category?.name}
              className=""
              hostId={podcast.host.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
};