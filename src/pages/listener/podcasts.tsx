import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { PODCAST_FRAGMENT } from '../../fragments';
import { podcastsPageQuery } from '../../__generated__/podcastsPageQuery';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Podcast } from '../../components/podcast';

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

interface IFormProps {
  searchTerm: string;
}

export const Podcasts = () => {
  const { data } = useQuery<podcastsPageQuery>(PODCASTS_QUERY);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home | Ouber Eats</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSearchSubmit)} className=" bg-gradient-to-r from-blue-800 via-violet-800 to-violet-500 w-full py-10 flex justify-center items-center">
        <input
          ref={register({ required: true })}
          name="searchTerm"
          type="Search"
          className="input border-0 rounded-md w-3/4  md:w-5/12"
          placeholder="Search Podcasts..."
        />
      </form>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto mt-8">
        <div className="grid md:grid-cols-4 gap-x-5 gap-y-10 mt-7">
          {data?.getAllPodcasts.podcasts?.map((podcast) => (
            <Podcast
              key={podcast.id}
              id={podcast.id + ''}
              coverImage={podcast.coverImage}
              title={podcast.title}
              categoryName={podcast.category}
              className=""
            />
          ))}
        </div>
      </div>
    </div>
  )
};