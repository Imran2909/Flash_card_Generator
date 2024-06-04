import React, { useState } from 'react';
import styles from './AllFlashcard.module.css';
import { ImCross } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { deleteData } from '../../redux/action';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function IndividualCards(props) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState(null);

  const deleteCard = () => {
    dispatch(deleteData(selectedId));
    onClose();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    onOpen();
  };

  return (
    <div>
      <div className={styles.cardContainer}>
        <ImCross className={styles.closeButton} onClick={() => openDeleteModal(props._id)} />
        <div className={styles.imagePlaceholder}>
          <img src={props.image} alt="" className={styles.imeg} />
        </div>
        <h3 className={styles.title}>{props.groupName}</h3>
        <p className={styles.description}>
          {props.description.length > 100 ? props.description.slice(0, 40) + '...' : props.description}
        </p>
        <p className={styles.cardCount}> {props.cards.length} cards</p>
        <button className={styles.viewButton}>
          <Link to={`/flashcards/${props._id}`} >
            View Cards
          </Link>
        </button>
      </div>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to delete this card?</ModalHeader>
          <ModalFooter>
            <Button colorScheme="red" mr={4} onClick={deleteCard}>
              YES
            </Button>
            <Button colorScheme="green" onClick={onClose}>NO</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default IndividualCards;
