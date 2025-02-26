import { DELETE_EXP } from "../actions/deleteExp";

const initialState = {
  content: [],
};

const deleteExp = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EXP:
      return {
        ...state,
        content: state.content.filter((exp) => exp._id !== action.payload), //elimina l'exp con quello specifico id
      };
    default:
      return state;
  }
};

export default deleteExp;
