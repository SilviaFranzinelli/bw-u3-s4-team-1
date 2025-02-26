import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { fetchPosts, createPost, updatePost, deletePost } from "../redux/reducers/postSlice";

const PostSection = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.content);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = () => {
    const newPost = { text: "Nuovo post di esempio" };
    dispatch(createPost(newPost));
  };

  const handleUpdatePost = (id) => {
    const updatedPost = { text: "Post aggiornato!" };
    dispatch(updatePost({ id, updatedPost }));
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Container className="mt-4">
      <Button onClick={handleCreatePost} className="mb-3">
        Aggiungi Post
      </Button>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post._id || post.text} className="mb-3">
            {" "}
            {/* Usa _id o text come fallback */}
            <Card.Body>
              <Card.Text>{post.text}</Card.Text>
              <Button variant="warning" onClick={() => handleUpdatePost(post._id)} className="me-2">
                Modifica
              </Button>
              <Button variant="danger" onClick={() => handleDeletePost(post._id)}>
                Elimina
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Nessun post disponibile.</p>
      )}
    </Container>
  );
};

export default PostSection;
