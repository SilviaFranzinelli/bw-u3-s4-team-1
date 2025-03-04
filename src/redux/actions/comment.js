export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

const API_URL = "https://striveschool-api.herokuapp.com/api/comments/";
const AUTH_HEADER = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2MxODU2OTVjZDk5MjAwMTUwNTkyZTEiLCJpYXQiOjE3NDA3MzU4NDksImV4cCI6MTc0MTk0NTQ0OX0.y_oLysyB_Img7kfV_kh6AB685W4max_pQtbZT5Xn9Ko",
  "Content-Type": "application/json",
};


export const fetchComments = (postId) => async (dispatch) => {
  try {
    if (!postId) {
      console.error(" postId è undefined o nullo");
      return;
    }

    console.log(postId); 

    const response = await fetch(`${API_URL}?elementId=${postId}`, { headers: AUTH_HEADER });

    if (!response.ok) throw new Error("Errore nel recupero dei commenti");

    const comments = await response.json();
    console.log("Commenti ricevuti:", comments);

    dispatch({ type: FETCH_COMMENTS, payload: { postId, comments } });
  } catch (error) {
    console.error("Errore nel fetch dei commenti:", error);
  }
};



export const addComment = (postId, commentText) => async (dispatch) => {
  try {
    if (!postId) throw new Error("postId non valido");

    const newComment = {
      comment: commentText,
      rate: "5", 
      elementId: postId, 
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: AUTH_HEADER,
      body: JSON.stringify(newComment),
    });

    if (!response.ok) throw new Error("Errore nell'aggiunta del commento");

    const addedComment = await response.json();
    dispatch({ type: ADD_COMMENT, payload: { postId, comment: addedComment } });

    dispatch(fetchComments(postId)); 
  } catch (error) {
    console.error("Errore nell'aggiunta del commento:", error);
  }
};


export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    if (!commentId || !postId) throw new Error("Dati commento non validi");

    const response = await fetch(`${API_URL}${commentId}`, {
      method: "DELETE",
      headers: AUTH_HEADER,
    });

    if (!response.ok) throw new Error("Errore nella cancellazione del commento");

    dispatch(fetchComments(postId)); 
  } catch (error) {
    console.error("Errore nella cancellazione del commento:", error);
  }
};
