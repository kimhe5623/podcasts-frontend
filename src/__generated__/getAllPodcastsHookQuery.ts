/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPodcastsHookQuery
// ====================================================

export interface getAllPodcastsHookQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface getAllPodcastsHookQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastsHookQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastsHookQuery {
  getAllPodcasts: getAllPodcastsHookQuery_getAllPodcasts;
}
