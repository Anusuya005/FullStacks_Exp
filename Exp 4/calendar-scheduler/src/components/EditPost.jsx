import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { useDispatch } from "react-redux";

import {
  updatePost,
  deletePost,
  togglePostStatus,
} from "../redux/postsSlice";

function EditPost({ post, onClose }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!post) return;

    const startDate = new Date(post.start);

    setTitle(post.title);

    setDate(
      startDate.toISOString().split("T")[0]
    );

    setTime(
      startDate.toTimeString().slice(0, 5)
    );
  }, [post]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!title.trim() || !date || !time) {
        alert("Please fill in all fields.");
        return;
      }

      const start = `${date}T${time}`;

      const end = new Date(start);

      end.setHours(
        end.getHours() + 1
      );

      dispatch(
        updatePost({
          id: post.id,
          title: title.trim(),
          start,
          end: end.toISOString(),
        })
      );

      onClose();
    },
    [
      title,
      date,
      time,
      post,
      dispatch,
      onClose,
    ]
  );

  const handleDelete = useCallback(() => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${post.title}"?`
    );

    if (!confirmed) return;

    dispatch(deletePost(post.id));

    onClose();
  }, [post, dispatch, onClose]);

  const handleToggleStatus =
    useCallback(() => {
      dispatch(
        togglePostStatus(post.id)
      );

      onClose();
    }, [post, dispatch, onClose]);

  if (!post) {
    return null;
  }

  return (
    <div className="edit-overlay">

      <div className="edit-modal">

        <h2>Edit Post</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-field">

            <label htmlFor="edit-title">
              Post Title
            </label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          <div className="form-field">

            <label htmlFor="edit-date">
              Date
            </label>

            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>

          <div className="form-field">

            <label htmlFor="edit-time">
              Time
            </label>

            <input
              id="edit-time"
              type="time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
            />

          </div>

          <div className="status-display">
            Status:

            <strong>
              {post.completed
                ? " Completed"
                : " Pending"}
            </strong>
          </div>

          <div className="edit-actions">

            <button type="submit">
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleToggleStatus}
            >
              {post.completed
                ? "Mark as Pending"
                : "Mark as Done"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="delete-button"
            >
              Delete Post
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default memo(EditPost);