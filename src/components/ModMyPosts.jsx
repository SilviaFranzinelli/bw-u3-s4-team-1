import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchModPosts } from "../redux/actions/ModPost";
import { fetchPosts } from "../redux/reducers/postSlice";
import { fetchDeletePost } from "../redux/actions/deletePost";
import { Trash } from "react-bootstrap-icons";

function ModMyPosts({ show, onClose, postId }) {
  const dispatch = useDispatch();
  const post = useSelector(
    (state) => state.posts.content.find((p) => p._id === postId) //Trova il post dall'ID
  );
  const profile = useSelector((state) => state.profile?.content);
  console.log("Show:", show);
  console.log("PostId:", postId);

  console.log("Found post:", post);
  const [updatedText, setUpdatedText] = useState("");

  useEffect(() => {
    if (post) {
      setUpdatedText(post.text || ""); // Se il testo del post è undefined, usa una stringa vuota
    }
  }, [post]);

  const handleChange = (e) => {
    setUpdatedText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postId || !updatedText) return;

    await dispatch(fetchModPosts(postId, updatedText));

    onClose();
    dispatch(fetchPosts());
  };

  const handleDelete = (idUser, idPost) => {
    /* console.log(id); */
    if (idUser === profile._id) {
      //confronta l'id dell'user del post con l'id del nostro user,se è lo stesso fa le dispatch
      confirm("Conferma per eliminare il tuo post.");
      dispatch(fetchDeletePost(idPost)); //passo l'id del post per la modifica
      dispatch(fetchPosts()); //richiamo la fetch dei post
    }
  };

  if (!post) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Il tuo post:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Modifica il tuo post:</Form.Label>
            <Form.Control type="text" value={updatedText} onChange={handleChange} />
          </Form.Group>
          <Modal.Footer className="d-flex justify-content-between px-0">
            <Button className="btn-danger" onClick={() => handleDelete(post.user._id, post._id)}>
              <Trash />
            </Button>
            <div>
              <Button className="me-1" variant="secondary" onClick={onClose}>
                Annulla
              </Button>
              <Button variant="primary" type="submit">
                Salva
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModMyPosts;
