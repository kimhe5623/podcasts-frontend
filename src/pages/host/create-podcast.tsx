import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { createPodcastMutation, createPodcastMutationVariables } from '../../__generated__/createPodcastMutation';

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($input: CreatePodcastInput!) {
    createPodcast(
      input: $input
      ) {
        ok
        error
        id
      }
  }
`;

interface ICreatePodcastForm {
  title: string;
  coverImage: string;
  categoryName: string;
}

export const CreatePodcast = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
    setValue
  } = useForm<ICreatePodcastForm>({
    mode: "onChange"
  })

  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok }
    } = data;
    if (ok) {
      alert("New Podcast was successfully created!");
      setValue("title", "");
      setValue("coverImage", "");
      setValue("categoryName", "");
    }
  };

  const [createPodcastMutation, { data: createPodcastResult, loading }] = useMutation<
    createPodcastMutation,
    createPodcastMutationVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    if (!loading) {
      const { title, coverImage, categoryName } = getValues();
      createPodcastMutation({
        variables: {
          input: {
            title,
            coverImage,
            categoryName
          }
        }
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col p-10 lg:pt-32 bg-violet-100">
      <Helmet>
        <title>Create New Podcast | Podcasts</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
        <div className="text-3xl font-bold text-gray-800 mb-5">New Podcast</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 pt-5 w-full mb-4"
        >
          <input
            ref={register({
              required: "Title is required",
            })}
            name="title"
            type="text"
            placeholder="Title"
            className="input" />
          {errors.title?.message && (
            <FormError errorMessage={errors.title?.message} />
          )}

          <input
            ref={register({
              required: "Cover Image URL is required",
            })}
            name="coverImage"
            type="text"
            placeholder="Cover Image URL"
            className="input" />
          {errors.coverImage?.message && (
            <FormError errorMessage={errors.coverImage?.message} />
          )}

          <input
            ref={register({ required: "Category is required" })}
            name="categoryName"
            type="text"
            placeholder="Category"
            className="input" />
          {errors.categoryName?.message && (
            <FormError errorMessage={errors.categoryName?.message} />
          )}

          <Button canClick={formState.isValid} loading={loading} actionText="Create Podcast"></Button>
          {createPodcastResult?.createPodcast.error && <FormError errorMessage={createPodcastResult.createPodcast.error} />}
        </form>
      </div>
    </div>
  );
}