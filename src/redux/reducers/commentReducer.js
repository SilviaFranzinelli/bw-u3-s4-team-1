import { FETCH_COMMENTS, ADD_COMMENT } from "../actions/comment";

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        [action.payload.postId]: action.payload.comments || [], // ✅ Evita undefined
      };

    case ADD_COMMENT:
      return {
        ...state,
        [action.payload.postId]: [
          ...(state[action.payload.postId] || []), // ✅ Evita undefined
          action.payload.comment,
        ],
      };

    default:
      return state;
  }
};

export default commentReducer;
