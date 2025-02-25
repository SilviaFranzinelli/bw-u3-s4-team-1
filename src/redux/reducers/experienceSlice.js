import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experiences: [],
};

const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    addExperience: (state, action) => {
      const newId = state.experiences.length > 0 ? Math.max(...state.experiences.map((exp) => exp.id)) + 1 : 1;
      state.experiences.push({ id: newId, ...action.payload });
    },
    removeExperience: (state, action) => {
      state.experiences = state.experiences.filter((exp) => exp.id !== action.payload);
    },
    updateExperience: (state, action) => {
      const index = state.experiences.findIndex((exp) => exp.id === action.payload.id);
      if (index !== -1) {
        state.experiences[index] = action.payload;
      }
    },
  },
});

export const { addExperience, removeExperience, updateExperience } = experienceSlice.actions;
export default experienceSlice.reducer;
