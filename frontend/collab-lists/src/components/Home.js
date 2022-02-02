import { React, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "react-bootstrap/Button";
import axios from "axios";
import NewListModal from "./NewListModal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import List from "./List";

const Home = () => {
  const { user, setUser } = useAuth();
  const [lists, setLists] = useState([]);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [update, setUpdate] = useState(true);
  const [listToEdit, setListToEdit] = useState(null);

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
            <List
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
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{list.title}</Card.Title>
                    {/* <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text> */}
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
