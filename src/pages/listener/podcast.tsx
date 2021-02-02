import { gql, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PODCAST_WHOLE_FRAGMENT } from '../../fragments';
import { podcastQuery, podcastQueryVariables } from '../../__generated__/podcastQuery';

const PODCAST_QUERY = gql`
  query podcastQuery($input: PodcastSearchInput!) {
    getPodcast(
      input: $input
    ) {
      ok
      error
      podcast {
        ...PodcastWholeParts
      }
    }
  }
  ${PODCAST_WHOLE_FRAGMENT}
`;

interface IPodcastParams {
  id: string;
}

export const Podcast = () => {
  const params = useParams<IPodcastParams>();
  const { loading, data } = useQuery<
    podcastQuery,
    podcastQueryVariables
  >(PODCAST_QUERY, {
    variables: {
      input: {
        id: +params.id
      }
    }
  });
  console.log(data);
  return (
    <div>
      <div className="bg-cover bg-center h-80" style={{ backgroundImage: `url(${data?.getPodcast.podcast?.coverImage})` }}>
        <div className=" bg-gradient-to-t from-dark h-full bg-opacity-30 flex flex-col justify-end items-start p-8">
          <h4 className="text-4xl text-white font-bold">{data?.getPodcast.podcast?.title}</h4>
          <h5 className="pt-3 text-lg text-white">{'Category > '}{data?.getPodcast.podcast?.category}</h5>
          </div>
      </div>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto mt-8">
        <div className="flex flex-col">
          {data?.getPodcast.podcast?.episodes?.map((episode) => (
            <div>
              <h3>{episode.title}</h3>
              <h5>{episode.category}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}