/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateEpisodeMutation
// ====================================================

export interface updateEpisodeMutation_updateEpisode {
  __typename: "UpdateEpisodeOutput";
  ok: boolean;
  error: string | null;
}

export interface updateEpisodeMutation {
  updateEpisode: updateEpisodeMutation_updateEpisode;
}

export interface updateEpisodeMutationVariables {
  input: UpdateEpisodeInput;
}
