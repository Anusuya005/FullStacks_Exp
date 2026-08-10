import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    {
      id: '1',
      title: 'Welcome Post',
      content: 'This is the first post',
      platform: 'Instagram',
    },
  ],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, platform) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            platform,
          },
        };
      },
    },

    deletePost(state, action) {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    updatePost(state, action) {
      const { id, title, content, platform } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.platform = platform;
      }
    },
  },
});

export const { addPost, deletePost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;