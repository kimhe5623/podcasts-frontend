/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsHookQuery
// ====================================================

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  summary: string;
  filePath: string;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_subscribers {
  __typename: "User";
  email: string;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts_reviews {
  __typename: "Review";
  title: string;
  text: string;
  creator: searchPodcastsHookQuery_searchPodcasts_podcasts_reviews_creator;
}

export interface searchPodcastsHookQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: searchPodcastsHookQuery_searchPodcasts_podcasts_category | null;
  rating: number;
  host: searchPodcastsHookQuery_searchPodcasts_podcasts_host;
  episodes: searchPodcastsHookQuery_searchPodcasts_podcasts_episodes[];
  subscribers: searchPodcastsHookQuery_searchPodcasts_podcasts_subscribers[];
  reviews: searchPodcastsHookQuery_searchPodcasts_podcasts_reviews[];
}

export interface searchPodcastsHookQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsHookQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsHookQuery {
  searchPodcasts: searchPodcastsHookQuery_searchPodcasts;
}

export interface searchPodcastsHookQueryVariables {
  input: SearchPodcastsInput;
}
