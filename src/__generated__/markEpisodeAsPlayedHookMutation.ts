/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MarkEpisodeAsPlayedInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: markEpisodeAsPlayedHookMutation
// ====================================================

export interface markEpisodeAsPlayedHookMutation_markEpisodeAsPlayed {
  __typename: "MarkEpisodeAsPlayedOutput";
  ok: boolean;
  error: string | null;
}

export interface markEpisodeAsPlayedHookMutation {
  markEpisodeAsPlayed: markEpisodeAsPlayedHookMutation_markEpisodeAsPlayed;
}

export interface markEpisodeAsPlayedHookMutationVariables {
  input: MarkEpisodeAsPlayedInput;
}
