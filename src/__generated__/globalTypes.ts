/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SearchFor {
  Any = "Any",
  Host = "Host",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  filePath: string;
  summary: string;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  coverImage: string;
  categoryName: string;
}

export interface DeleteEpisodeInput {
  episodeId: number;
}

export interface DeletePodcastInput {
  id: number;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface GetEpisodeInput {
  episodeId: number;
}

export interface GetPodcastInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MarkEpisodeAsPlayedInput {
  episodeId: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  searchFor: SearchFor;
  titleQuery: string;
  categorySlug?: string | null;
}

export interface UpdateEpisodeInput {
  episodeId: number;
  title?: string | null;
  summary?: string | null;
  filePath?: string | null;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  coverImage?: string | null;
  rating?: number | null;
  categoryName?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
