import { React, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const NewListModal = ({ handleClose, showNewListModal, forceUpdate }) => {
  const [listName, setListName] = useState("");
  const { user } = useAuth();

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:5000/lists/add", {
        owner: user,
        title: listName,
      })
      .catch((err) => {
        console.log(err);
      });
    forceUpdate();
    handleClose();
  };

  return (
    <Modal show={showNewListModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New list</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formListName">
            <Form.Label>List name</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter list name"
              required
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save list
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewListModal;
