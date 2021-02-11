import { gql, useQuery } from '@apollo/client';
import { getAllPodcastsHookQuery } from '../__generated__/getAllPodcastsHookQuery';

const GET_ALL_PODCAST_QUERY = gql`
query getAllPodcastsHookQuery {
  getAllPodcasts {
    ok
    error
    podcasts {
      id
      title
    }
  }
}
`;

export const GetAllPodcasts = () => {
  return useQuery<getAllPodcastsHookQuery>(GET_ALL_PODCAST_QUERY);
}