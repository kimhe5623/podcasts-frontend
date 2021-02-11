/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeHookQuery
// ====================================================

export interface getEpisodeHookQuery_getEpisode_episode_players {
  __typename: "User";
  id: number;
  email: string;
}

export interface getEpisodeHookQuery_getEpisode_episode_podcast_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface getEpisodeHookQuery_getEpisode_episode_podcast_host {
  __typename: "User";
  id: number;
}

export interface getEpisodeHookQuery_getEpisode_episode_podcast_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface getEpisodeHookQuery_getEpisode_episode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: getEpisodeHookQuery_getEpisode_episode_podcast_category | null;
  host: getEpisodeHookQuery_getEpisode_episode_podcast_host;
  subscribers: getEpisodeHookQuery_getEpisode_episode_podcast_subscribers[];
}

export interface getEpisodeHookQuery_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  filePath: string;
  updatedAt: any;
  summary: string;
  players: getEpisodeHookQuery_getEpisode_episode_players[];
  podcast: getEpisodeHookQuery_getEpisode_episode_podcast;
}

export interface getEpisodeHookQuery_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  error: string | null;
  episode: getEpisodeHookQuery_getEpisode_episode;
}

export interface getEpisodeHookQuery {
  getEpisode: getEpisodeHookQuery_getEpisode;
}

export interface getEpisodeHookQueryVariables {
  input: GetEpisodeInput;
}
