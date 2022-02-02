import { React, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const List = ({
  handleClose,
  showEditListModal,
  forceUpdate,
  listToEdit,
  lists,
}) => {
  const [listName, setListName] = useState("");
  const { user } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let itemcount = 0;
    setItems(
      lists
        .filter((list) => list._id === listToEdit)[0]
        .items.map((item) => {
          return { id: itemcount++, itemName: item };
        })
    );
    let usercount = 0;
    setUsers(
      lists
        .filter((list) => list._id === listToEdit)[0]
        .users.map((user) => {
          return { id: usercount++, userName: user };
        })
    );
    setListName(lists.filter((list) => list._id === listToEdit)[0].title);
  }, [listToEdit, lists]);

  const handleSubmit = (e) => {
    axios
      .post(`http://localhost:5000/lists/update/${listToEdit}`, {
        title: listName,
        items: items.map((item) => item.itemName),
        users: users.map((user) => user.userName),
      })
      .catch((err) => {
        console.log(err);
      });
    forceUpdate();
    handleClose();
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:5000/lists/${listToEdit}`)
      .then(() => {
        forceUpdate();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddItem = async (e) => {
    let newItems = items;
    newItems.push({ itemName: "New Item", id: items.length });
    setItems(newItems);
    setCount(count + 1);
  };

  const handleChangeItem = async (e, id) => {
    let newItems = items;
    newItems[id].itemName = e.target.value;
    setItems(newItems);
  };

  const handleAddUser = async (e) => {
    let newUsers = users;
    newUsers.push({ userName: "New User", id: users.length });
    setUsers(newUsers);
    setCount(count + 1);
  };

  const handleChangeUser = async (e, id) => {
    let newUsers = users;
    newUsers[id].userName = e.target.value;
    setUsers(newUsers);
  };

  const handleDeleteItem = async (e, id) => {
    let newItems = items;
    setItems(newItems.filter((item) => item.id !== id));
    setCount(count - 1);
  };

  const handleDeleteUser = async (e, id) => {
    let newUsers = users;
    setUsers(newUsers.filter((user) => user.id !== id));
    setCount(count - 1);
  };

  return (
    <Modal show={showEditListModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {lists.filter((list) => list._id === listToEdit)[0].title}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formListName">
            <Form.Label style={{ fontWeight: "bold" }}>List name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={
                lists.filter((list) => list._id === listToEdit)[0].title
              }
              required
              onChange={(e) => setListName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>Users</Form.Label>
            <>
              {users.map((u) => {
                if (u.userName === user) {
                  return null;
                }
                return (
                  <div key={u.id} style={{ display: "flex" }}>
                    <Form.Control
                      id={u.id}
                      type="text"
                      onChange={(e) => handleChangeUser(e, u.id)}
                      defaultValue={u.userName}
                    />
                    {lists.filter((list) => list._id === listToEdit)[0]
                      .owner === user ? (
                      <Button
                        variant="danger"
                        onClick={(e) => handleDeleteUser(e, u.id)}
                      >
                        X
                      </Button>
                    ) : null}
                  </div>
                );
              })}
            </>
            {lists.filter((list) => list._id === listToEdit)[0].owner ===
            user ? (
              <Button onClick={handleAddUser}>Add User</Button>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontWeight: "bold" }}>Items</Form.Label>
            {items.map((item) => {
              return (
                <div key={item.id} style={{ display: "flex" }}>
                  <Form.Control
                    id={item.id}
                    type="text"
                    onChange={(e) => handleChangeItem(e, item.id)}
                    defaultValue={item.itemName}
                  />
                  <Button
                    variant="danger"
                    onClick={(e) => handleDeleteItem(e, item.id)}
                  >
                    X
                  </Button>
                </div>
              );
            })}
            <Button onClick={handleAddItem}>Add Item</Button>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {confirmDelete ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                Delete list
              </Button>
              <Button variant="primary" type="submit">
                Save list
              </Button>
            </>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default List;
