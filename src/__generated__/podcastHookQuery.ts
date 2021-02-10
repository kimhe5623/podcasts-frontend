/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastHookQuery
// ====================================================

export interface podcastHookQuery_getPodcast_podcast {
  __typename: "Podcast";
  title: string;
}

export interface podcastHookQuery_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: podcastHookQuery_getPodcast_podcast | null;
}

export interface podcastHookQuery {
  getPodcast: podcastHookQuery_getPodcast;
}

export interface podcastHookQueryVariables {
  input: GetPodcastInput;
}
