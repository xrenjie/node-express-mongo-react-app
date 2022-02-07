import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import NewListModal from "./NewListModal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useAuth } from "../contexts/AuthContext";
import EditListModal from "./EditListModal";

const Home = () => {
  const { user, setUser } = useAuth();
  const [lists, setLists] = useState([]);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [update, setUpdate] = useState(true);
  const [listToEdit, setListToEdit] = useState(null);

  //keeps track of whether or not the user is logged in on refresh
  //also updates lists when *update* is true (happens when a list is added)
  useEffect(() => {
    const currentUser = window.localStorage.getItem("user");
    if (currentUser) {
      setUser(currentUser);
    }
    if (user) {
      axios.get("http://localhost:5000/lists/" + user).then((res) => {
        setLists(res.data);
      });
    }
    if (update) {
      axios.get("http://localhost:5000/lists/" + user).then((res) => {
        setLists(res.data);
      });
      setUpdate(false);
    }
  }, [update, user, setUser]);

  const handleNewListButton = () => {
    setShowNewListModal(true);
  };

  const handleCloseNewListModal = () => {
    setShowNewListModal(false);
  };

  const handleEditListButton = (e) => {
    setListToEdit(e.target.id);
    setShowEditListModal(true);
  };

  const handleCloseEditListModal = () => {
    setShowEditListModal(false);
  };

  const forceUpdate = () => {
    setUpdate(true);
  };

  return (
    <div style={{ display: "flex", margin: "20px", gap: "5px" }}>
      {user ? (
        <div style={{ gap: "10px" }}>
          <Button variant="primary" onClick={handleNewListButton}>
            New List
          </Button>
          {showNewListModal ? (
            <NewListModal
              handleClose={handleCloseNewListModal}
              showNewListModal={showNewListModal}
              forceUpdate={forceUpdate}
            />
          ) : null}
          {showEditListModal ? (
            <EditListModal
              handleClose={handleCloseEditListModal}
              showEditListModal={showEditListModal}
              forceUpdate={forceUpdate}
              listToEdit={listToEdit}
              lists={lists}
            />
          ) : null}

          <Container>
            {lists.map((list) => {
              return (
                <Card style={{ width: "18rem" }} key={list._id}>
                  <Card.Body>
                    <Card.Title>{list.title}</Card.Title>
                    <Button
                      variant="primary"
                      onClick={(e) => handleEditListButton(e)}
                      id={list._id}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </Container>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default Home;
