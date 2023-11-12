import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

const Remove = ({ modalInfo, hideModal, updateTasks }) => {
  const { value } = modalInfo;
  const { id } = value;

  const removeTask = (e) => {
    e.preventDefault();
    updateTasks((draft) => draft.splice(id));
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup onSubmit={removeTask} className="mb-3">
          <div className="d-flex justify-content-start">
            <input
              onClick={hideModal}
              className="btn btn-danger"
              type="button"
              value="remove"
            />
          </div>
        </FormGroup>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
