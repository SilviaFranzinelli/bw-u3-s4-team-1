import { NEW_EXP } from "../actions/newExp";

const initialState = {
  experiences: [],
};

const experiencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_EXP:
      // Aggiunge la nuova esperienza all'array esistente
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    default:
      return state;
  }
};

export default experiencesReducer;
