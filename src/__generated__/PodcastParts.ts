/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface PodcastParts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface PodcastParts_subscribers {
  __typename: "User";
  email: string;
}

export interface PodcastParts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface PodcastParts_reviews {
  __typename: "Review";
  title: string;
  text: string;
  creator: PodcastParts_reviews_creator;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: PodcastParts_category | null;
  rating: number;
  host: PodcastParts_host;
  subscribers: PodcastParts_subscribers[];
  reviews: PodcastParts_reviews[];
}
