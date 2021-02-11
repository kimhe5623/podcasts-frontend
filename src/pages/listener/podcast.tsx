import { gql, useQuery } from '@apollo/client';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { TITLE } from '../../constants';
import { PODCAST_WHOLE_FRAGMENT } from '../../fragments';
import { useMe } from '../../hooks/useMe';
import { UserRole } from '../../__generated__/globalTypes';
import { podcastQuery, podcastQueryVariables } from '../../__generated__/podcastQuery';
import { DeleteEpisode } from '../../modals/delete-episode.modal';
import { UpdateEpisode } from '../../modals/update-episode.modal';

const PODCAST_QUERY = gql`
  query podcastQuery($input: GetPodcastInput!) {
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
  const { data } = useQuery<
    podcastQuery,
    podcastQueryVariables
  >(PODCAST_QUERY, {
    variables: {
      input: {
        id: +params.id
      }
    }
  });
  const meData = useMe();

  return (
    <div>
      <Helmet>
        <title>{`${data?.getPodcast.podcast?.title}`} | {`${TITLE}`}</title>
      </Helmet>
      <div className="bg-cover bg-center h-80" style={{ backgroundImage: `url(${data?.getPodcast.podcast?.coverImage})` }}>
        <div className="flex justify-between bg-gradient-to-t from-dark h-full bg-opacity-30 p-8 2xl:px-56 xl:px-20 px-5">
          <div className=" flex flex-col justify-end items-start ">
            <h4 className="text-4xl text-white font-bold">{data?.getPodcast.podcast?.title}</h4>
            <h5 className="pt-3 text-lg text-white">{data?.getPodcast.podcast?.category?.name}</h5>
          </div>
          {
            meData.data?.me.role === UserRole.Host &&
            meData.data?.me.id === data?.getPodcast.podcast?.host.id &&
            (

              <div className="h-full ml-8 flex justify-end items-end">
                <Link to={`/create-new-episode/${data?.getPodcast.podcast?.id}`} className="group cursor-pointer flex flex-col justify-end items-center text-center ">
                  <FontAwesomeIcon className="text-5xl text-white group-hover:text-violet-300 text-center mt-6" icon={faPlusSquare} />
                  <span className="opacity-0 group-hover:opacity-100 duration-300 text-violet-300 text-center">New Episode</span>
                </Link>
              </div>
            )
          }
        </div>
      </div>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto mt-8">
        <div className="flex flex-col">
          {data?.getPodcast.podcast?.episodes?.map((episode) => (
            <div className="flex justify-between py-6 border-b border-gray-300">
                <Link to={`/episode/${episode.id}`} key={episode.id}>
                  <div>
                    <h3 className="text-2xl font-medium mb-4">{episode.title}</h3>
                    <h5>{episode.summary}</h5>
                  </div>
                </Link>
                {
                  meData.data?.me.role === UserRole.Host &&
                  meData.data.me.id === data.getPodcast.podcast?.host.id && (
                    <div className="flex flex-col justify-around">
                      <DeleteEpisode
                        episodeId={episode.id + ''}
                        btnClassName="text-red-600 mx-2"
                      />
                      <UpdateEpisode
                        btnClassName="flex justify-center"
                        episodeId={episode.id + ''}
                        title={episode.title}
                        filePath={episode.filePath}
                        summary={episode.summary} />
                    </div>
                  )
                }
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}