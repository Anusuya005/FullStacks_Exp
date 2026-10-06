import React from 'react';

import AddPost from './components/AddPost';
import PostList from './components/PostList';
import PlatformList from './components/PlatformList';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Redux Toolkit Post Manager</h1>

      <PlatformList />

      <hr />

      <AddPost />

      <hr />

      <PostList />
    </div>
  );
}

export default App;