/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsQuery
// ====================================================

export interface searchPodcastsQuery_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_subscribers {
  __typename: "User";
  email: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts_reviews {
  __typename: "Review";
  title: string;
  text: string;
  creator: searchPodcastsQuery_searchPodcasts_podcasts_reviews_creator;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: searchPodcastsQuery_searchPodcasts_podcasts_category | null;
  rating: number;
  host: searchPodcastsQuery_searchPodcasts_podcasts_host;
  subscribers: searchPodcastsQuery_searchPodcasts_podcasts_subscribers[];
  reviews: searchPodcastsQuery_searchPodcasts_podcasts_reviews[];
}

export interface searchPodcastsQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsQuery {
  searchPodcasts: searchPodcastsQuery_searchPodcasts;
}

export interface searchPodcastsQueryVariables {
  input: SearchPodcastsInput;
}
