import React from "react";
import { Modal } from "react-bootstrap";

const EmailVerificationModal = ({
  show,
  onClose,
  title,
  description,
  icon,
}) => {
  return (
    <Modal show={show} onHide={onClose} className="verify-modal">
      <Modal.Header className="justify-content-center">
        <Modal.Title>
          <img src={icon} alt="" className="mb-4" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <h1 className="modal-heading mb-2">
          <span className="secondary-text">{title}</span>
        </h1>
        <p className="modal-desc mb-0 mt-0">{description}</p>
      </Modal.Body>
    </Modal>
  );
};

export default EmailVerificationModal;
