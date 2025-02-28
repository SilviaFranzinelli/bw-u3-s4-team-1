import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../redux/actions/comment";
import { Trash } from "react-bootstrap-icons";
import { Button, ListGroup } from "react-bootstrap";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.comments[postId]) || [];

  useEffect(() => {
    if (postId) {
      console.log(`📡 Fetching commenti per il post con ID: ${postId}`);
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  console.log("📝 Commenti ricevuti per il post:", postId, comments);

  return (
    <ListGroup className="mt-2">
      {comments.length === 0 ? (
        <p className="text-muted">Nessun commento ancora.</p>
      ) : (
        comments.slice(-5).map(
          (
            comment 
          ) => (
            <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{comment.author}</strong>: {comment.comment}
              </div>
              <Button variant="danger" size="sm">
                <Trash />
              </Button>
            </ListGroup.Item>
          )
        )
      )}
    </ListGroup>
  );
};

export default CommentList;
