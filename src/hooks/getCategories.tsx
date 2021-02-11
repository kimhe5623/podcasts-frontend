import { gql, useQuery } from '@apollo/client';
import { getCategoriesHookQuery } from '../__generated__/getCategoriesHookQuery';

const GET_ALL_CATEGORIES_QUERY = gql`
query getCategoriesHookQuery {
  getCategories {
    ok
    error
    categories {
      id
      name
      slug
    }
  }
}
`;

export const GetCategories = () => {
  return useQuery<getCategoriesHookQuery>(GET_ALL_CATEGORIES_QUERY);
}