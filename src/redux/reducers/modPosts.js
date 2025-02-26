import { MOD_POSTS } from "../actions/ModPost";

const initialState = {
  content: null,
};

const modPostsReducers = (state = initialState, action) => {
  switch (action.type) {
    case MOD_POSTS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default modPostsReducers;
