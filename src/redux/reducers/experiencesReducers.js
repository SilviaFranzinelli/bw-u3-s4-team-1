import { GET_EXP } from "../actions/exprerience";

const initialState = {
  content: null,
};

const getExperiencesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXP:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default getExperiencesReducers;
