/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: podcastsPageQuery
// ====================================================

export interface podcastsPageQuery_getAllPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
  slug: string;
}

export interface podcastsPageQuery_getAllPodcasts_podcasts_host {
  __typename: "User";
  email: string;
}

export interface podcastsPageQuery_getAllPodcasts_podcasts_subscribers {
  __typename: "User";
  email: string;
}

export interface podcastsPageQuery_getAllPodcasts_podcasts_reviews_creator {
  __typename: "User";
  email: string;
}

export interface podcastsPageQuery_getAllPodcasts_podcasts_reviews {
  __typename: "Review";
  title: string;
  text: string;
  creator: podcastsPageQuery_getAllPodcasts_podcasts_reviews_creator;
}

export interface podcastsPageQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  coverImage: string;
  category: podcastsPageQuery_getAllPodcasts_podcasts_category | null;
  rating: number;
  host: podcastsPageQuery_getAllPodcasts_podcasts_host;
  subscribers: podcastsPageQuery_getAllPodcasts_podcasts_subscribers[];
  reviews: podcastsPageQuery_getAllPodcasts_podcasts_reviews[];
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
