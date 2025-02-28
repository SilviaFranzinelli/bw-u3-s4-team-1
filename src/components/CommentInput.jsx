import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/actions/comment";
import { Form, Button } from "react-bootstrap";

const CommentInput = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    console.log(`📩 Invio commento "${commentText}" per il post ID: ${postId}`);
    dispatch(addComment(postId, commentText));
    setCommentText(""); // 🔥 Pulisce l'input dopo l'invio
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-2">
      <Form.Group>
        <Form.Control type="text" placeholder="Scrivi un commento..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-1">
        Invia
      </Button>
    </Form>
  );
};

export default CommentInput;
