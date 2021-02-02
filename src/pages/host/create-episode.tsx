import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { createEpisodeMutation, createEpisodeMutationVariables } from '../../__generated__/createEpisodeMutation';
import { useParams } from 'react-router-dom';

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
  coverImage: string;
  category: string;
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

  const onCompleted = (data: createEpisodeMutation) => {
    const {
      createEpisode: { ok }
    } = data;
    if (ok) {
      alert("New Episode was successfully created!");
      setValue("title", "");
      setValue("category", "");
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

      const { title, category } = getValues();
      createEpisodeMutation({
        variables: {
          input: {
            podcastId: 1,
            title,
            category
          }
        }
      });
    }
  };

  return (
    <h1>CreateEpisode</h1>
  );
}