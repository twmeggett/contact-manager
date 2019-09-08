import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default ({title, show, handleSubmit, handleDelete, handleClose, children}) => (
  <Modal
    show={show}
    onHide={handleClose}
    size="xl"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>{"title"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <button className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Deleted
      </button>
    </Modal.Footer>
  </Modal>
);
  