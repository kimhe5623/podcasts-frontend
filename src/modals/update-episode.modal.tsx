import { gql, useMutation } from '@apollo/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { updateEpisodeMutation, updateEpisodeMutationVariables } from '../__generated__/updateEpisodeMutation';

const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisodeMutation($input: UpdateEpisodeInput!) {
    updateEpisode(input: $input) {
      ok
      error
    }
  }
`;

interface IUpdateEpisodeProps {
  btnClassName?: string;
  episodeId: string;
  title: string;
  summary: string;
  filePath: string;
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

export const UpdateEpisode: React.FC<IUpdateEpisodeProps> = ({ episodeId, title, summary, filePath, btnClassName }) => {
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
  } = useForm<IUpdateEpisodeProps>({
    mode: "onChange"
  })

  const onCompleted = (data: updateEpisodeMutation) => {
    const {
      updateEpisode: { ok }
    } = data;
    if (ok) {
      alert("Your episode was successfully updated!");
      setValue("title", getValues("title"));
      setValue("summary", getValues("summary"));
      setValue("filePath", getValues("filePath"));
      closeModal();
    }
  }

  const [updateEpisodeMutation, { data: updateEpisodeResult, loading }] = useMutation<
    updateEpisodeMutation,
    updateEpisodeMutationVariables
  >(UPDATE_EPISODE_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    if (!loading) {
      let values = getValues();
      if (
        values.title !== title ||
        values.filePath !== filePath ||
        values.summary !== summary
      ) {
        updateEpisodeMutation({
          variables: {
            input: {
              episodeId: +episodeId,
              ...(title !== "" && { title }),
              ...(filePath !== "" && { filePath }),
              ...(summary !== "" && { summary }),
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
        <div id="updateEpisode" className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
          <div className="text-3xl font-bold text-gray-800 mb-5">Update {title} Episode</div>
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
                getValues("filePath") !== "" && (
                  <label className="text-sm mb-1" htmlFor="filePath">File</label>
                )
              }
              <input
                ref={register({
                  required: "File is required"
                })}
                name="filePath"
                type="text"
                placeholder="File"
                className="input"
                defaultValue={filePath}
              />
              {errors.filePath?.message && (
                <FormError errorMessage={errors.filePath.message} />
              )}
            </div>

            <div className="flex flex-col">
              {
                getValues("summary") !== "" && (
                  <label className="text-sm mb-1" htmlFor="summary">Summary</label>
                )
              }
              <textarea
                ref={register({
                  required: "Summary is required"
                })}
                name="summary"
                rows={5}
                cols={50}
                placeholder="Summary"
                className="input"
                defaultValue={summary}
              />
              {errors.summary?.message && (
                <FormError errorMessage={errors.summary.message} />
              )}
            </div>

            <Button canClick={formState.isValid} loading={loading} actionText="Update Episode"></Button>
            {updateEpisodeResult?.updateEpisode.error && <FormError errorMessage={updateEpisodeResult.updateEpisode.error} />}
          </form>
          <div onClick={closeModal} className="text-violet-900 hover:text-black hover:underline cursor-pointer">Cancel</div>
        </div>
      </Modal>
    </div>
  );
}