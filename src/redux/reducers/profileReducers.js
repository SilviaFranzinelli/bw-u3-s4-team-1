const initialState = {
  content: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        content: action.payload,
      };
    case "MOD_PROFILE":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
