import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/posts/postsSlice';

function AddPost() {
  const dispatch = useDispatch();

  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      dispatch(
        addPost({
            title,
            content,
            platform,
    })
    );

      setTitle('');
      setContent('');
      setPlatform(platforms[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />
      <br />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {platforms.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPost;