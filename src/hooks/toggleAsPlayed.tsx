import { gql, useMutation } from '@apollo/client';
import { markEpisodeAsPlayedHookMutation, markEpisodeAsPlayedHookMutationVariables } from '../__generated__/markEpisodeAsPlayedHookMutation';

const MARK_EPISODE_AS_PLAYED_HOOK = gql`
  mutation markEpisodeAsPlayedHookMutation ($input: MarkEpisodeAsPlayedInput!) {
    markEpisodeAsPlayed (input: $input) {
      ok
      error
    }
}
`;

export const MarkEpisodeAsPlayed = (episodeId: number) => {
  return useMutation<
    markEpisodeAsPlayedHookMutation,
    markEpisodeAsPlayedHookMutationVariables
  >(MARK_EPISODE_AS_PLAYED_HOOK, {
    variables: {
      input: {
        episodeId
      },
    },
  });
}