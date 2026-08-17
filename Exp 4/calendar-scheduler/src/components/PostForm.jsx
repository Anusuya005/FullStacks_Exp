import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";

function PostForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const start = `${date}T${time}`;

    const endDate = new Date(start);
    endDate.setHours(endDate.getHours() + 1);

    dispatch(
      addPost({
        id: Date.now().toString(),
        title: title.trim(),
        start,
        end: endDate.toISOString(),
      })
    );

    setTitle("");
    setDate("");
    setTime("");
  };

  return (
    <div className="form-card">
      <h2>Schedule a Post</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-field">
          <label htmlFor="post-title">
            Post Title
          </label>

          <input
            id="post-title"
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="post-date">
            Date
          </label>

          <input
            id="post-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="post-time">
            Time
          </label>

          <input
            id="post-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button type="submit">
          Schedule Post
        </button>

      </form>
    </div>
  );
}

export default PostForm;