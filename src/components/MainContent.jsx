import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, loadMorePosts } from "../redux/reducers/postSlice";
import { fetchComments } from "../redux/actions/comment"; 
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart, HeartFill, Chat, Share, Send, Pen } from "react-bootstrap-icons";
import { newPost } from "../redux/actions/newPost";
import { getProfile } from "../redux/actions";
import CommentInput from "./CommentInput";
import ModMyPosts from "./ModMyPosts";
import CommentList from "./CommentList";

const MainContent = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const profile = useSelector((state) => state.profile?.content);
  const { content: posts, status, visiblePostsCount } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments || {}); 
  const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMorePosts());
  };

  const filteredPosts = posts.filter((post) => post.text);
  const visiblePosts = filteredPosts.reverse().slice(0, visiblePostsCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    const newPosts = { text };
    await dispatch(newPost(newPosts));
    setText("");
    dispatch(fetchPosts());
  };

  const handleOpenModal = (event, postToEdit) => {
    setSelectedPost(postToEdit._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleLike = (postId) => {
    setIsLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] ? prev[postId] + (isLiked[postId] ? -1 : 1) : 1,
    }));
  };

  const handleToggleCommentInput = (postId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    dispatch(fetchComments(postId)); 
  };

  return (
    <>
      <Container className="bg-light border rounded-2">
        <Container className="mt-3">
          <Container className="border mb-2 bg-body py-2">
            <Row>
              <Col className="mt-1" md={1}>
                {profile ? (
                  <img src={profile.image} alt="Profile" className="rounded-circle border border-white" style={{ width: "50px" }} />
                ) : (
                  <p className="text-muted">Caricamento profilo...</p>
                )}
              </Col>
              <Col md={11} className="mt-2">
                <form onSubmit={handleSubmit}>
                  <input
                    className="border border-secondary text-dark bg-light rounded-5 text-start py-2 ms-2"
                    style={{ width: "100%", paddingLeft: "1rem" }}
                    placeholder="Crea un post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
              </Col>
            </Row>
          </Container>

          {status === "loading" ? (
            <p>Caricamento in corso...</p>
          ) : status === "failed" ? (
            <p>Errore nel caricamento dei post</p>
          ) : (
            visiblePosts.map((post) => (
              <Container key={post._id} className="bg-white border rounded-2 mb-3 p-3">
                <Row>
                  <Col md={1}>
                    <img src={post.user.image} alt="Post User" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                  </Col>
                  <Col md={11}>
                    <div className="d-flex justify-content-between">
                      <p style={{ fontWeight: "600" }}>
                        {post.user.name} <span> {post.user.surname}</span>
                      </p>
                      {post.user._id === profile._id && <Pen onClick={(e) => handleOpenModal(e, post)} className="ms-2 btn-success cursor-pointer" />}
                    </div>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>{post.text}</p>

                    <p>
                      <strong>{post.user.title}</strong>
                    </p>

                    <Row className="mt-3">
                      <Col>
                        <Button variant="link" className="p-0" onClick={() => toggleLike(post._id)}>
                          {isLiked[post._id] ? (
                            <HeartFill className="text-danger" style={{ fontSize: "18px" }} />
                          ) : (
                            <Heart className="text-danger" style={{ fontSize: "18px" }} />
                          )}
                        </Button>
                        <span className="ms-1 p-0">{likes[post._id] || 0}</span>
                      </Col>
                      <Col>
                        <Chat className="text-primary cursor-pointer" style={{ fontSize: "18px" }} onClick={() => handleToggleCommentInput(post._id)} />
                        <span className="ms-1">Commenta</span>
                      </Col>
                      <Col>
                        <Share className="text-warning" style={{ fontSize: "18px" }} />
                      </Col>
                      <Col>
                        <Send className="text-success" style={{ fontSize: "18px" }} />
                      </Col>
                    </Row>

                    {showCommentInput[post._id] && <CommentInput postId={post._id} />}

                    {comments[post._id] && comments[post._id].length > 0 && (
                      <CommentList comments={comments[post._id].slice(-5)} />
                    )}
                  </Col>
                </Row>
              </Container>
            ))
          )}
        </Container>

        <ModMyPosts show={showModal} onClose={handleCloseModal} postId={selectedPost} />

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
