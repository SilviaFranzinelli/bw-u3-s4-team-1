import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, loadMorePosts } from "../redux/reducers/postSlice";
import { Container, Row, Col, Button } from "react-bootstrap";

const MainContent = () => {
  const dispatch = useDispatch();
  const { content: posts, status, visiblePostsCount } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts()); // Carica i post solo se non sono stati ancora caricati
    }
  }, [dispatch, status]);

  const handleLoadMore = () => {
    dispatch(loadMorePosts()); // Aumenta il numero di post visibili
  };

  // Slice dei post da visualizzare
  const visiblePosts = posts.slice(0, visiblePostsCount);

  return (
    <>
      <Container className="bg-light border rounded-2">
        {/* Altre sezioni del layout */}
        <Container className="mt-3">
          {status === "loading" ? (
            <p>Caricamento in corso...</p>
          ) : status === "failed" ? (
            <p>Errore nel caricamento dei post</p>
          ) : (
            visiblePosts.map((post) => (
              <Container key={post.id} className="bg-white border rounded-2 mb-3 p-3">
                <Row>
                  <Col md={1}>
                    <img src={post.user.image} alt="Post User" className="rounded-circle" style={{ width: "40px" }} />
                  </Col>
                  <Col md={11}>
                    <p style={{ fontWeight: "600" }}>{post.username}</p>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>{post.content}</p>
                  </Col>
                </Row>
              </Container>
            ))
          )}
        </Container>

        {/* Bottone per caricare altri 20 post */}
        {posts.length > visiblePostsCount && (
          <Button onClick={handleLoadMore} className="mt-3">
            Visualizza altro
          </Button>
        )}
      </Container>
    </>
  );
};

export default MainContent;
