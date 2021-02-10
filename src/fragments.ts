import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    coverImage
    category {
      name
      slug
    }
    rating
    host {
      email
    }
    subscribers {
      email
    }
    reviews {
      title
      text
      creator {
        email
      }
    }
  }
`;

export const PODCAST_WHOLE_FRAGMENT = gql`
  fragment PodcastWholeParts on Podcast {
    id
    title
    coverImage
    category {
      name
      slug
    }
    rating
    host {
      email
    }
    episodes {
      id
      title
      summary
      filePath
    }
    subscribers {
      email
    }
    reviews {
      title
      text
      creator {
        email
      }
    }
  }
`;