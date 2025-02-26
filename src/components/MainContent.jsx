import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, loadMorePosts } from "../redux/reducers/postSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart, Chat, Share, Send } from "react-bootstrap-icons"; // Import delle icone

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

  // Filtra i post per includere solo quelli con tutti i campi necessari
  const filteredPosts = posts.filter((post) => post.user && post.user.image && post.user.bio && post.user.title);

  // Slice dei post da visualizzare
  const visiblePosts = filteredPosts.slice(0, visiblePostsCount);

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
              <Container key={post._id} className="bg-white border rounded-2 mb-3 p-3">
                <Row>
                  <Col md={1}>
                    <img src={post.user.image} alt="Post User" className="rounded-circle" style={{ width: "40px" }} />
                  </Col>
                  <Col md={11}>
                    <p style={{ fontWeight: "600" }}>{post.user.username}</p>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>{post.text}</p>
                    {/* Visualizza la bio, title e immagine del profilo */}
                    <p>{post.user.bio}</p>
                    <p>
                      <strong>{post.user.title}</strong>
                    </p>

                    {/* Sezione interazioni con icone */}
                    <Row className="mt-3">
                      <Col>
                        <Heart className="text-danger" style={{ fontSize: "18px" }} /> {/* Icona cuore */}
                        <span className="ms-1">225</span>
                      </Col>
                      <Col>
                        <Chat className="text-primary" style={{ fontSize: "18px" }} /> {/* Icona commento */}
                        <span className="ms-1">1 commento</span>
                      </Col>
                      <Col>
                        <Share className="text-warning" style={{ fontSize: "18px" }} /> {/* Icona condivisione */}
                        <span className="ms-1">1 diffusione</span>
                      </Col>
                      <Col>
                        <Send className="text-success" style={{ fontSize: "18px" }} /> {/* Icona invio */}
                        <span className="ms-1">Invia</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ))
          )}
        </Container>

        {/* Bottone per caricare altri 20 post */}
        {filteredPosts.length > visiblePostsCount && (
          <Button onClick={handleLoadMore} className="mt-3">
            Visualizza altro
          </Button>
        )}
      </Container>
    </>
  );
};

export default MainContent;
