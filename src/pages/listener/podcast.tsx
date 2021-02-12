import { gql, useMutation, useQuery } from '@apollo/client';
import { faCheck, faPlusSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { TITLE } from '../../constants';
import { PODCAST_WHOLE_FRAGMENT } from '../../fragments';
import { useMe } from '../../hooks/useMe';
import { UserRole } from '../../__generated__/globalTypes';
import { podcastQuery, podcastQueryVariables } from '../../__generated__/podcastQuery';
import { DeleteEpisode } from '../../modals/delete-episode.modal';
import { UpdateEpisode } from '../../modals/update-episode.modal';
import { transformDate, transformEmail } from '../../hooks/transform';
import Rating from 'react-rating';
import { CreateReview } from '../../modals/create-review';
import { toggleSubscribeMutation, toggleSubscribeMutationVariables } from '../../__generated__/toggleSubscribeMutation';

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

const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation toggleSubscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(
      input: $input
    ) {
      ok
      error
    }
  }
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
  const [subscribed, setSubscribed] = useState(false);
  
  useEffect(() => {
    data?.getPodcast.podcast?.subscribers.forEach((subscriber) => {
      setSubscribed(subscribed || meData.data?.me.id === subscriber.id);
    });
  });

  const onCompleted = (data: toggleSubscribeMutation) => {
    const {
      toggleSubscribe: { ok }
    } = data;
    if (ok) {
      setSubscribed(true);
    }
  }

  const [toggleSubscribeMutation, { loading }] = useMutation<
    toggleSubscribeMutation,
    toggleSubscribeMutationVariables
  >(TOGGLE_SUBSCRIBE_MUTATION, {
    onCompleted
  });

  const onClickSubscribe = (podcastId: number | null | undefined) => {
    if(!loading && podcastId) {
      toggleSubscribeMutation({
        variables: {
          input: {
            podcastId
          }
        }
      })
    }
  }

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
          {
            meData.data?.me.role === UserRole.Listener &&
            subscribed === false &&
            (

              <div className="h-full ml-8 flex justify-end items-end">
                <div className="group cursor-pointer flex flex-col justify-end items-center text-center" onClick={() => {onClickSubscribe(data?.getPodcast.podcast?.id)}}>
                  <FontAwesomeIcon className="text-5xl text-white group-hover:text-violet-300 text-center mt-6" icon={faPlusSquare} />
                  <span className="opacity-0 group-hover:opacity-100 duration-300 text-violet-300 text-center">Subscribe</span>
                </div>
              </div>
            )
          }
          {
            meData.data?.me.role === UserRole.Listener &&
            subscribed === true &&
            (

              <div className="h-full ml-8 flex justify-end items-end">
                <div className="group cursor-pointer flex flex-col justify-end items-center text-center ">
                  <FontAwesomeIcon className="text-5xl text-white text-center mt-6" icon={faCheck} />
                  <span className="text-white text-center">Subscribed</span>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto mt-8">
        <div className="flex flex-col">
          {data?.getPodcast.podcast?.episodes?.map((episode) => (
            <div className="flex justify-between py-6 px-4 border-b border-gray-300">
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
        {/* reviews Box */}
        <div className="flex flex-col">
          <div className="flex flex-col p-4 bg-gray-100 border-b border-t border-gray-400">
            {/* Review*/}
            <div className="text-xl font-semibold">
              Reviews
            </div>
            {/* Ratings avg and Create Review Btn */}
            <div className="flex justify-between text-lg pt-2">
              <div><FontAwesomeIcon className="text-red-700" icon={faStar} /> {data?.getPodcast.podcast?.rating}</div>
              <CreateReview
                btnClassName="px-4 py-2 focus:outline-none border-2 border-black bg-white hover:bg-violet-100 hover:text-violet-900 hover:border-violet-900 rounded-lg"
                podcastId={`${data?.getPodcast.podcast?.id}`}
              />
            </div>
          </div>
          {/* Reviews */}
          <div className="grid grid-flow-row mb-7">
            {/* Map */}
            {
              data?.getPodcast.podcast?.reviews.map((review) => (
                <div className="p-4 border-b border-gray-300">
                  <div className="font-semibold text-lg pb-1">
                    {review.title}
                  </div>
                  <div className="font-semibold text-base">
                    <Rating
                      initialRating={review.rating}
                      emptySymbol="fa fa-star-o fa-2x text-lg text-red-700"
                      fullSymbol="fa fa-star fa-2x text-lg text-red-700"
                      fractions={2}
                      readonly
                    />
                    <span className="text-lg ml-1">{review.rating}</span>
                  </div>
                  <div className="font-light text-sm">
                    {transformEmail(review.creator.email)} | {transformDate(review.updatedAt)}
                  </div>
                  <div className="pt-2">
                    {review.text}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}