/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeQuery
// ====================================================

export interface getEpisodeQuery_getEpisode_episode_players {
  __typename: "User";
  id: number;
  email: string;
}

export interface getEpisodeQuery_getEpisode_episode_podcast_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface getEpisodeQuery_getEpisode_episode_podcast_host {
  __typename: "User";
  id: number;
}

export interface getEpisodeQuery_getEpisode_episode_podcast_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface getEpisodeQuery_getEpisode_episode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: getEpisodeQuery_getEpisode_episode_podcast_category | null;
  host: getEpisodeQuery_getEpisode_episode_podcast_host;
  subscribers: getEpisodeQuery_getEpisode_episode_podcast_subscribers[];
}

export interface getEpisodeQuery_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  filePath: string;
  updatedAt: any;
  summary: string;
  players: getEpisodeQuery_getEpisode_episode_players[];
  podcast: getEpisodeQuery_getEpisode_episode_podcast;
}

export interface getEpisodeQuery_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisodeQuery_getEpisode_episode;
}

export interface getEpisodeQuery {
  getEpisode: getEpisodeQuery_getEpisode;
}

export interface getEpisodeQueryVariables {
  input: GetEpisodeInput;
}
