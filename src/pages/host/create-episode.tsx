import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { createEpisodeMutation, createEpisodeMutationVariables } from '../../__generated__/createEpisodeMutation';
import { Link, useParams } from 'react-router-dom';
import { GetPodcastTitle } from '../../hooks/getPodcastTitle';

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutation($input: CreateEpisodeInput!) {
    createEpisode(
      input: $input
      ) {
        ok
        error
        id
      }
  }
`;

interface ICreateEpisodeForm {
  title: string;
  summary: string;
}

interface IPodcastParams {
  podcastId: string;
}

export const CreateEpisode = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
    setValue
  } = useForm<ICreateEpisodeForm>({
    mode: "onChange"
  })

  const params = useParams<IPodcastParams>();
  const podcastTitle = GetPodcastTitle(+params.podcastId);

  const onCompleted = (data: createEpisodeMutation) => {
    const {
      createEpisode: { ok }
    } = data;
    if (ok) {
      alert("New Episode was successfully created!");
      setValue("title", "");
      setValue("summary", "");
    }
  };

  const [createEpisodeMutation, { data: createPodcastResult, loading }] = useMutation<
    createEpisodeMutation,
    createEpisodeMutationVariables
  >(CREATE_EPISODE_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    if (!loading) {
      const { title, summary } = getValues();
      createEpisodeMutation({
        variables: {
          input: {
            podcastId: +params.podcastId,
            title,
            summary: summary,
            filePath: ""
          }
        }
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col p-10 lg:pt-32 bg-violet-100">
      <Helmet>
        <title>Create New Episode | Podcasts</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
        <div className="text-3xl font-bold text-gray-800 mb-5">New Episode</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 pt-5 w-full mb-4"
        >
          <input
            name="title"
            type="text"
            placeholder="Podcast Title"
            className="input"
            defaultValue={podcastTitle}
            disabled
          />

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

          <textarea
            ref={register({ required: "Summary is required" })}
            name="summary"
            rows={5}
            cols={50}
            placeholder="Summary..."
            className="input" />
          {errors.summary?.message && (
            <FormError errorMessage={errors.summary?.message} />
          )}

          <Button canClick={formState.isValid} loading={loading} actionText="Create Episode"></Button>
          {createPodcastResult?.createEpisode.error && <FormError errorMessage={createPodcastResult.createEpisode.error} />}
        </form>
        <div>
          Go back to <Link to={`/podcast/${params.podcastId}`} className="text-lime-600 hover:underline">{podcastTitle} page</Link>
        </div>
      </div>
    </div>
  );
}