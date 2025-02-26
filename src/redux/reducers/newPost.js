import { NEW_POST } from "../actions/newPost";

const initialState = {
  content: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST:
      return {
        ...state,
        content: [...state.content, action.payload],
      };
    default:
      return state;
  }
};

export default postReducer;
