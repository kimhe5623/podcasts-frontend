import { gql, useMutation } from '@apollo/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { updatePodcastMutation, updatePodcastMutationVariables } from '../__generated__/updatePodcastMutation';

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IUpdatePodcastProps {
  btnClassName?: string;
  id: string;
  title: string;
  coverImage: string;
  categoryName?: string | null;
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

export const UpdatePodcast: React.FC<IUpdatePodcastProps> = ({ id, title, coverImage, categoryName, btnClassName }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
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
  } = useForm<IUpdatePodcastProps>({
    mode: "onChange"
  })

  const onCompleted = (data: updatePodcastMutation) => {
    const {
      updatePodcast: { ok }
    } = data;
    if (ok) {
      alert("Your podcast was successfully updated!");
      setValue("title", getValues("title"));
      setValue("coverImage", getValues("coverImage"));
      setValue("categoryName", getValues("categoryName"));
      closeModal();
    }
  }

  const [updatePodcastMutation, { data: updatePodcastResult, loading }] = useMutation<
    updatePodcastMutation,
    updatePodcastMutationVariables
  >(UPDATE_PODCAST_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    if (!loading) {
      let values = getValues();
      if (
        values.title !== title ||
        values.coverImage !== coverImage ||
        values.categoryName !== categoryName
      ) {
        updatePodcastMutation({
          variables: {
            input: {
              id: +id,
              payload: {
                ...(title !== "" && { title }),
                ...(coverImage !== "" && { coverImage }),
                ...(categoryName !== "" && { categoryName }),
              }
            }
          }
        });
      } else {
        alert("Enter updated data at least one!!");
      }
    }
  }
  Modal.setAppElement("div");
  return (
    <div>
      <div
        className={`cursor-pointer ${btnClassName}`}
        onClick={openModal}>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div id="updatePodcast" className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
          <div className="text-3xl font-bold text-gray-800 mb-5">Update {title} Podcast</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 pt-5 w-full mb-4"
          >
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
                defaultValue={title}
              />
              {errors.title?.message && (
                <FormError errorMessage={errors.title.message} />
              )}
            </div>

            <div className="flex flex-col">
              {
                getValues("coverImage") !== "" && (
                  <label className="text-sm mb-1" htmlFor="coverImage">Cover Image</label>
                )
              }
              <input
                ref={register({
                  required: "CoverImage is required"
                })}
                name="coverImage"
                type="text"
                placeholder="Cover Image"
                className="input"
                defaultValue={coverImage}
              />
              {errors.coverImage?.message && (
                <FormError errorMessage={errors.coverImage.message} />
              )}
            </div>

            <div className="flex flex-col">
              {
                getValues("categoryName") !== "" && (
                  <label className="text-sm mb-1" htmlFor="categoryName">Category</label>
                )
              }
              <input
                ref={register({
                  required: "Category is required"
                })}
                name="categoryName"
                type="text"
                placeholder="Category"
                className="input"
                defaultValue={categoryName ? categoryName : ''}
              />
              {errors.categoryName?.message && (
                <FormError errorMessage={errors.categoryName.message} />
              )}
            </div>

            <Button canClick={formState.isValid} loading={loading} actionText="Update Podcast"></Button>
            {updatePodcastResult?.updatePodcast.error && <FormError errorMessage={updatePodcastResult.updatePodcast.error} />}
          </form>
          <div onClick={closeModal} className="text-violet-900 hover:text-black hover:underline cursor-pointer">Cancel</div>
        </div>
      </Modal>
    </div>
  );
}