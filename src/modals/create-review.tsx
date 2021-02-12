import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import Rating from 'react-rating';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { useMe } from '../hooks/useMe';
import { createReviewMutation, createReviewMutationVariables } from '../__generated__/createReviewMutation';
import { UserRole } from '../__generated__/globalTypes';

const CREATE_REVIEW_MUTATION = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      error
    }
  }
`;

interface ICreateReviewProps {
  btnClassName?: string;
  podcastId: string;
}

interface IFormProps {
  title: string;
  text: string;
}

const customStyles = {
  overlay: {
    backgroundColor: '#584d63cf'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export const CreateReview: React.FC<ICreateReviewProps> = ({ podcastId, btnClassName }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const meData = useMe();
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
    setValue
  } = useForm<IFormProps>({
    mode: "onChange"
  })

  const onCompleted = (data: createReviewMutation) => {
    const {
      createReview: { ok }
    } = data;
    if (ok) {
      alert("Your review was succesfully created!!");
      setValue("title", "");
      setValue("text", "");
      closeModal();
    }
  }

  const [createReviewMutation, { data: updateEpisodeResult, loading }] = useMutation<
    createReviewMutation,
    createReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    console.log({
      podcastId: +podcastId,
      title: getValues("title"),
      text: getValues("text"),
      rating: rating
    });
    if (!loading) {
      createReviewMutation({
        variables: {
          input: {
            podcastId: +podcastId,
            title: getValues("title"),
            text: getValues("text"),
            rating: rating
          }
        }
      });
    }
  }
  Modal.setAppElement("div");
  return (
    <div>
      {
        meData.data?.me.role === UserRole.Host ? (
          <button
            className={`focus:outline-none pointer-events-none ${btnClassName}`}
            disabled
          >
            For Only Listener
          </button>
        )
          :
          (
            <button
              className={`focus:outline-none cursor-pointer ${btnClassName}`}
              onClick={openModal}
            >
              Write Review
            </button>
          )
      }
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        onAfterClose={() => {window.location.reload();}}
      >
        <div id="updateEpisode" className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
          <div className="text-3xl font-bold text-gray-800 mb-5">New Review</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 w-full mb-4"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl ml-2 mb-1">{rating}</span>
              <Rating
                initialRating={5}
                emptySymbol="fa fa-star-o fa-2x text-4xl text-red-700"
                fullSymbol="fa fa-star fa-2x text-4xl text-red-700"
                fractions={2}
                onChange={(value) => {
                  setRating(value);
                }}
              />
            </div>
            <div className="flex flex-col">
              {
                getValues("title") !== "" && (
                  <label className="text-sm mb-1" htmlFor="title">Title</label>
                )
              }
              <input
                ref={register({
                  required: "Title is required"
                })}
                name="title"
                type="text"
                placeholder="Title"
                className="input"
              />
              {errors.title?.message && (
                <FormError errorMessage={errors.title.message} />
              )}
            </div>

            <div className="flex flex-col">
              {
                getValues("text") !== "" && (
                  <label className="text-sm mb-1" htmlFor="text">Contents</label>
                )
              }
              <textarea
                ref={register({
                  required: "Contents is required"
                })}
                name="text"
                rows={5}
                cols={50}
                placeholder="Contents"
                className="input"
              />
              {errors.text?.message && (
                <FormError errorMessage={errors.text.message} />
              )}
            </div>

            <Button canClick={formState.isValid} loading={loading} actionText="Create Review"></Button>
            {updateEpisodeResult?.createReview.error && <FormError errorMessage={updateEpisodeResult.createReview.error} />}
          </form>
          <div onClick={closeModal} className="text-violet-900 hover:text-black hover:underline cursor-pointer">Cancel</div>
        </div>
      </Modal>
    </div>
  );
}