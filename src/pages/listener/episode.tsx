import { faEye, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { TITLE } from '../../constants';
import { transformDate } from '../../hooks/transform';
import { gql, useMutation, useQuery } from '@apollo/client';
import { markEpisodeAsPlayedMutation, markEpisodeAsPlayedMutationVariables } from "../../__generated__/markEpisodeAsPlayedMutation";
import { useMe } from '../../hooks/useMe';
import { EPISODE_FRAGMENT } from '../../fragments';
import { getEpisodeQuery, getEpisodeQueryVariables} from '../../__generated__/getEpisodeQuery';

const MARK_EPISODE_AS_PLAYED = gql`
  mutation markEpisodeAsPlayedMutation ($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed (input: $input) {
      ok
      error
    }
}
`;

const GET_EPISODE_QUERY = gql`
query getEpisodeQuery ($input: GetEpisodeInput!) {
  getEpisode (input: $input) {
    ok
    error
    episode {
      ...EpisodeParts
    }
  }
}
${EPISODE_FRAGMENT}
`;

interface IEpisodeParams {
  episodeId: string;
}
export const Episode = () => {
  const params = useParams<IEpisodeParams>();
  const [clickedPlayBtn, setClickedPlayBtn] = useState(false);
  const [views, setViews] = useState(0);
  const onCompletedGetEpisode = (data: getEpisodeQuery) => {
    setViews(data.getEpisode.episode.players.length);
  }
  const { data } = useQuery<
    getEpisodeQuery,
    getEpisodeQueryVariables
  >(GET_EPISODE_QUERY, {
    variables: {
      input: {
        episodeId: +params.episodeId
      }
    },
    onCompleted: onCompletedGetEpisode
  });
  const meData = useMe();
  let alreadyPlayed = false;
  data?.getEpisode.episode.players.forEach((player) =>{
    alreadyPlayed = alreadyPlayed || player.id === meData.data?.me.id;
  });

  const [markEpisodeAsPlayedMutation, { loading }] = useMutation<
    markEpisodeAsPlayedMutation,
    markEpisodeAsPlayedMutationVariables
  >(MARK_EPISODE_AS_PLAYED);

  const onClickPlayBtn = () => {
    if (!loading && !clickedPlayBtn && !alreadyPlayed) {
      markEpisodeAsPlayedMutation({
        variables: {
          input: {
            episodeId: +params.episodeId
          }
        }
      });
      setClickedPlayBtn(true);
      setViews(views + 1);
    } else {
      alert("Already played it!!")
    }
  }
  return (
    <div>
      <Helmet>
        <title>{`${data?.getEpisode.episode?.title}`} | {`${TITLE}`}</title>
      </Helmet>
      <div className="bg-cover bg-center h-80" style={{ backgroundImage: `url(${data?.getEpisode.episode?.podcast.coverImage})` }}>
        <div className="flex sm:flex-row justify-between flex-col sm:bg-gradient-to-t sm:from-dark h-full sm:bg-opacity-30 bg-gray-900 bg-opacity-70 p-8 2xl:px-56 xl:px-20 px-5">
          <div className=" flex flex-col justify-end items-start ">
            <h4 className="text-4xl text-white font-bold">{data?.getEpisode.episode?.title}</h4>
            <h5 className="pt-3 text-lg text-white">
              {data?.getEpisode.episode?.podcast.category?.name}
              {' > '}
              {data?.getEpisode.episode.podcast.title}
            </h5>
          </div>
          <div className="flex sm:flex-col flex-row justify-between">
            <div
              onClick={onClickPlayBtn}
              className="text-white flex justify-end cursor-pointer hover:text-violet-300 text-6xl">
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
            <div className="ml-8 flex justify-end items-end text-white text-sm">
              <div>
                {transformDate(data?.getEpisode.episode.updatedAt)}
              </div>
              <div className="ml-3">
                <FontAwesomeIcon icon={faEye} /> {views}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 2xl:px-0 max-w-screen-lg mx-auto mt-8">
        <div className="flex flex-col">
          <div className="text-xl font-semibold mb-2">Summary</div>
          <div>{data?.getEpisode.episode.summary}</div>
        </div>
      </div>
    </div>
  );
}