import { gql, useQuery } from '@apollo/client';
import { podcastHookQuery, podcastHookQueryVariables } from '../__generated__/podcastHookQuery';

const PODCAST_QUERY = gql`
query podcastHookQuery($input: GetPodcastInput!) {
  getPodcast(
    input: $input
  ) {
    ok
    error
    podcast {
      title
    }
  }
}
`;

export const GetPodcastTitle = (podcastId: number) => {
  const { data } = useQuery<podcastHookQuery, podcastHookQueryVariables>(PODCAST_QUERY, {
    variables: {
      input: {
        id: podcastId
      }
    }
  });
  return data?.getPodcast.podcast?.title;
}