import { DELETE_POST } from "../actions/deletePost";

const initialState = {
  content: [],
};

const deletePost = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        content: state.content.filter((post) => post._id !== action.payload), //elimina il post con quello specifico id
      };
    default:
      return state;
  }
};

export default deletePost;
