import { gql, useMutation } from '@apollo/client';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { deleteEpisodeMutation, deleteEpisodeMutationVariables } from '../__generated__/deleteEpisodeMutation';

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisodeMutation($input: DeleteEpisodeInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

interface IDeleteEpisodeProps {
  episodeId: string;
  btnClassName?: string;
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

export const DeleteEpisode: React.FC<IDeleteEpisodeProps> = ({ episodeId, btnClassName }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [sayYes, setSayYesOrNot] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onCompleted = (data: deleteEpisodeMutation) => {
    const {
      deleteEpisode: { ok }
    } = data;
    if (ok) {
      alert("Your episode was successfully deleted!");
      setSayYesOrNot(true);
      closeModal();
    }
  }

  const [deleteEpisodeMutation, { loading }] = useMutation<
    deleteEpisodeMutation,
    deleteEpisodeMutationVariables
  >(DELETE_EPISODE_MUTATION, {
    onCompleted
  });

  const onClickYes = () => {
    if (!loading) {
      deleteEpisodeMutation({
        variables: {
          input: {
            episodeId: +episodeId
          }
        }
      });
    }
  }

  const onAfterClose = () => {
    if(sayYes) {
      window.location.reload();
      setSayYesOrNot(false);
    }
  }

  Modal.setAppElement("div");
  return (
    <div>
      <div
        className={`cursor-pointer ${btnClassName}`}
        onClick={openModal}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        onAfterClose={onAfterClose}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="mt-3 mb-5">
            Do you really want to delete this episode?
          </div>
          <div className="flex">
            <button
              onClick={onClickYes}
              className="focus:outline-none mr-4 w-20 rounded-lg text-white font-semibold py-4 transition-colors text-xl bg-violet-600 hover:bg-violet-700"
            > Yes</button>
            <button
              onClick={closeModal}
              className="focus:outline-none w-20 rounded-lg text-white font-semibold py-4 transition-colors text-xl bg-gray-600 hover:bg-gray-700"
            > Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}