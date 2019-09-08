import React from 'react';
import Modal from 'react-bootstrap/Modal';



export default ({title, show, handleSubmit, handleDelete, handleClose, actionBtns, children}) => {
  const ActionBtns = actionBtns();
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {ActionBtns}
      </Modal.Footer>
    </Modal>
  )
};
  