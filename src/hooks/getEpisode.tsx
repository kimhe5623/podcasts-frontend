import { gql, useQuery } from '@apollo/client';
import { getEpisodeHookQuery, getEpisodeHookQueryVariables } from '../__generated__/getEpisodeHookQuery';
import { EPISODE_FRAGMENT } from '../fragments';

const GET_EPISODE_HOOK_QUERY = gql`
query getEpisodeHookQuery ($input: GetEpisodeInput!) {
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

export const GetEpisode = (episodeId: number) => {
  return useQuery<
  getEpisodeHookQuery, 
  getEpisodeHookQueryVariables
  >(GET_EPISODE_HOOK_QUERY, {
    variables: {
      input: {
        episodeId
      }
    },
  });
}