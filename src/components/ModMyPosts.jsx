import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchModPosts } from "../redux/actions/ModPost";
import { fetchPosts } from "../redux/reducers/postSlice";

function ModMyPosts({ show, onClose, postId }) {
  const dispatch = useDispatch();
  const post = useSelector(
    (state) => state.posts.content.find((p) => p._id === postId) //Trova il post dall'ID
  );
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

  if (!post) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID Post: {postId}</Form.Label>
            <Form.Control type="text" value={updatedText} onChange={handleChange} />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Annulla
            </Button>
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModMyPosts;
