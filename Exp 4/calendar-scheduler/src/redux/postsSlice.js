import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "AI Trends 2026",
    start: "2026-08-18T10:00:00",
    end: "2026-08-18T11:00:00",
    completed: false,
  },
  {
    id: "2",
    title: "Project Discussion",
    start: "2026-08-20T14:00:00",
    end: "2026-08-20T15:00:00",
    completed: false,
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.push({
        ...action.payload,
        completed: action.payload.completed ?? false,
      });
    },

    updatePost: (state, action) => {
      const index = state.findIndex(
        (post) => String(post.id) === String(action.payload.id)
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      }
    },

    deletePost: (state, action) => {
      return state.filter(
        (post) => String(post.id) !== String(action.payload)
      );
    },

    reschedulePost: (state, action) => {
      const post = state.find(
        (post) => String(post.id) === String(action.payload.id)
      );

      if (post) {
        post.start = action.payload.start;
        post.end = action.payload.end;
      }
    },

    togglePostStatus: (state, action) => {
      const post = state.find(
        (post) => String(post.id) === String(action.payload)
      );

      if (post) {
        post.completed = !post.completed;
      }
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  reschedulePost,
  togglePostStatus,
} = postsSlice.actions;

export default postsSlice.reducer;