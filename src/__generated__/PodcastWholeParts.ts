/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastWholeParts
// ====================================================

export interface PodcastWholeParts_creator {
  __typename: "User";
  email: string;
}

export interface PodcastWholeParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface PodcastWholeParts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface PodcastWholeParts_reviews {
  __typename: "Review";
  id: number;
  title: string;
  text: string;
  creator: PodcastWholeParts_reviews_creator;
}

export interface PodcastWholeParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  coverImage: string;
  creator: PodcastWholeParts_creator;
  episodes: PodcastWholeParts_episodes[];
  reviews: PodcastWholeParts_reviews[];
}
