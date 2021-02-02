/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: podcastsPageQuery
// ====================================================

export interface podcastsPageQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: string;
  rating: number;
}

export interface podcastsPageQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: podcastsPageQuery_getAllPodcasts_podcasts[] | null;
}

export interface podcastsPageQuery {
  getAllPodcasts: podcastsPageQuery_getAllPodcasts;
}
