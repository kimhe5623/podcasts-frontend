/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastQuery
// ====================================================

export interface podcastQuery_getPodcast_podcast_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface podcastQuery_getPodcast_podcast_host {
  __typename: "User";
  id: number;
  email: string;
}

export interface podcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  summary: string;
  filePath: string;
}

export interface podcastQuery_getPodcast_podcast_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface podcastQuery_getPodcast_podcast_reviews_creator {
  __typename: "User";
  email: string;
}

export interface podcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  title: string;
  updatedAt: any;
  text: string;
  rating: number;
  creator: podcastQuery_getPodcast_podcast_reviews_creator;
}

export interface podcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: podcastQuery_getPodcast_podcast_category | null;
  rating: number;
  host: podcastQuery_getPodcast_podcast_host;
  episodes: podcastQuery_getPodcast_podcast_episodes[];
  subscribers: podcastQuery_getPodcast_podcast_subscribers[];
  reviews: podcastQuery_getPodcast_podcast_reviews[];
}

export interface podcastQuery_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastQuery_getPodcast_podcast | null;
}

export interface podcastQuery {
  getPodcast: podcastQuery_getPodcast;
}

export interface podcastQueryVariables {
  input: GetPodcastInput;
}
