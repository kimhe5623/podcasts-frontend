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
      id
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
      id
      email
    }
    episodes {
      id
      title
      summary
      filePath
    }
    subscribers {
      id
      email
    }
    reviews {
      title
      updatedAt
      text
      rating
      creator {
        email
      }
    }
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    title
    filePath
    updatedAt
    summary
    players {
      id
      email
    }
    podcast {
      id
      title
      coverImage
      category {
        id
        name
        slug
      }
      host {
        id
      }
      subscribers {
        id
        email
      }
    }
  }

`;