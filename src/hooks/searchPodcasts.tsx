import { gql, useQuery } from '@apollo/client';
import { getAllPodcastsHookQuery } from '../__generated__/getAllPodcastsHookQuery';
import { UserRole } from '../__generated__/globalTypes';
import { PODCAST_WHOLE_FRAGMENT } from '../fragments';
import { searchPodcastsHookQuery, searchPodcastsHookQueryVariables } from '../__generated__/searchPodcastsHookQuery';;

const SEARCH_PODCASTS_HOOK_QUERY = gql`
  query searchPodcastsHookQuery(
    $input: SearchPodcastsInput!
  ) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
      podcasts {
        ...PodcastWholeParts
      }
    }
  }
  ${PODCAST_WHOLE_FRAGMENT}
`;

export const GetAllPodcasts = (searchFor: UserRole, titleQuery: string, page?: number) => {
  return useQuery<searchPodcastsHookQuery, searchPodcastsHookQueryVariables>(SEARCH_PODCASTS_HOOK_QUERY);
}