/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastWholeParts
// ====================================================

export interface PodcastWholeParts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface PodcastWholeParts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface PodcastWholeParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  summary: string;
  filePath: string;
}

export interface PodcastWholeParts_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface PodcastWholeParts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface PodcastWholeParts_reviews {
  __typename: "Review";
  title: string;
  updatedAt: any;
  text: string;
  rating: number;
  creator: PodcastWholeParts_reviews_creator;
}

export interface PodcastWholeParts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: PodcastWholeParts_category | null;
  rating: number;
  host: PodcastWholeParts_host;
  episodes: PodcastWholeParts_episodes[];
  subscribers: PodcastWholeParts_subscribers[];
  reviews: PodcastWholeParts_reviews[];
}
