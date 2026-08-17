import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import Calendar from "./components/Calendar";
import PostForm from "./components/PostForm";
import EditPost from "./components/EditPost";

function App() {
  const posts = useSelector(
    (state) => state.posts
  );

  const [selectedPost, setSelectedPost] =
    useState(null);

  const handleEventClick = useCallback(
    (eventId) => {
      console.log(
        "Selected event ID:",
        eventId
      );

      const post = posts.find(
        (item) => String(item.id) === String(eventId)
      );

      console.log(
        "Selected post:",
        post
      );

      if (post) {
        setSelectedPost(post);
      }
    },
    [posts]
  );

  const closeEdit = useCallback(() => {
    setSelectedPost(null);
  }, []);

  return (
    <div className="app">

      <header className="app-header">
        <h1>Post Scheduler</h1>

        <p>
          Interactive Calendar for Scheduling
          and Managing Posts
        </p>
      </header>

      <main className="main-content">

        <PostForm />

        <section className="calendar-section">

          <h2>Content Calendar</h2>

          <p>
            Click an event to edit it. Drag
            events to reschedule them and
            resize events to adjust duration.
          </p>

          <Calendar
            onEventClick={handleEventClick}
          />

        </section>

      </main>

      <EditPost
        post={selectedPost}
        onClose={closeEdit}
      />

      <footer>
        Full Stack-II Lab | Interactive
        Post Scheduling Calendar
      </footer>

    </div>
  );
}

export default App;