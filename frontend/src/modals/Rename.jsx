import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

const Rename = ({ modalInfo, hideModal, updateTasks }) => {
  const { value } = modalInfo;
  const { task, id } = value;
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: { task: task },
    onSubmit: (values, actions) => {
      updateTasks((draft) => {
        const selectedTask = draft.find((task) => (task.id = id));
        selectedTask.task = values.task;
      });
      actions.resetForm();
      inputRef.current.focus();
    },
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              id="task"
              name="task"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.task}
              ref={inputRef}
            />
          </FormGroup>
          <div className="d-flex justify-content-start">
            <input
              onClick={hideModal}
              className="btn btn-primary"
              type="button"
              value="submit"
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
