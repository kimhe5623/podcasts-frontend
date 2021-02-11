/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EpisodeParts
// ====================================================

export interface EpisodeParts_players {
  __typename: "User";
  id: number;
  email: string;
}

export interface EpisodeParts_podcast_category {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface EpisodeParts_podcast_host {
  __typename: "User";
  id: number;
}

export interface EpisodeParts_podcast_subscribers {
  __typename: "User";
  id: number;
  email: string;
}

export interface EpisodeParts_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: EpisodeParts_podcast_category | null;
  host: EpisodeParts_podcast_host;
  subscribers: EpisodeParts_podcast_subscribers[];
}

export interface EpisodeParts {
  __typename: "Episode";
  id: number;
  title: string;
  filePath: string;
  updatedAt: any;
  summary: string;
  players: EpisodeParts_players[];
  podcast: EpisodeParts_podcast;
}
