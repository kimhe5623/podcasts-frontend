/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoriesHookQuery
// ====================================================

export interface getCategoriesHookQuery_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
}

export interface getCategoriesHookQuery_getCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: getCategoriesHookQuery_getCategories_categories[] | null;
}

export interface getCategoriesHookQuery {
  getCategories: getCategoriesHookQuery_getCategories;
}
