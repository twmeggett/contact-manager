import React from 'react';
import Modal from 'react-bootstrap/Modal';

export const ActionBtn = ({label, bsClass, action}) => {
  <button className={`btn btn-${bsClass}`} onClick={action}>
    {label}
  </button>
}

export default ({title, show, actionBtns, children}) => {
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
  