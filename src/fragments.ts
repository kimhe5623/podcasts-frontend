import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    coverImage
    category
    rating
  }
`;

export const PODCAST_WHOLE_FRAGMENT = gql`
  fragment PodcastWholeParts on Podcast {
    id
    title
    category
    coverImage
    creator {
      email
    }
    episodes {
      id
      title
      category
    }
    reviews {
      id
      title
      text
      creator {
        email
      }
    }
  }
`;