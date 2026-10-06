import { useState, useEffect } from "react";
import "./PostComposer.css";

function PostComposer() {
  // ============================
  // State Variables
  // ============================

  const [post, setPost] = useState("");
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState([]);

  // ============================
  // Platform List
  // ============================

  const platforms = [
    "Twitter",
    "Facebook",
    "Instagram",
    "LinkedIn",
  ];

  // ============================
  // Character Limits
  // ============================

  const limits = {
    Twitter: 280,
    Facebook: 63206,
    Instagram: 2200,
    LinkedIn: 3000,
  };

  // ============================
  // Platform Selection
  // ============================

  const handlePlatform = (platform) => {
    setSelected(platform);
  };

  // ============================
  // Save Draft
  // ============================

  const saveDraft = () => {
    const draft = {
      post,
      platform: selected,
    };

    localStorage.setItem("postDraft", JSON.stringify(draft));

    alert("✅ Draft Saved Successfully!");
  };

  // ============================
  // Validation
  // ============================

  useEffect(() => {
    let messages = [];

    if (selected === "") {
      messages.push("Please select a platform.");
    }

    if (selected !== "") {
      if (post.length > limits[selected]) {
        messages.push(
          `${selected}: Maximum ${limits[selected]} characters allowed.`
        );
      }

      if (selected === "Instagram" && image === null) {
        messages.push("Instagram requires an image.");
      }
    }

    setErrors(messages);

    // Update Browser Tab Title
    document.title = selected
      ? `${post.length}/${limits[selected]}`
      : `${post.length} Characters`;

  }, [post, selected, image]);

  // ============================
  // Load Draft Automatically
  // ============================

  useEffect(() => {
    const draft = localStorage.getItem("postDraft");

    if (draft) {
      const savedDraft = JSON.parse(draft);

      setPost(savedDraft.post || "");
      setSelected(savedDraft.platform || "");
    }
  }, []);
    return (
    <div className="post-composer">
      <h2>Dynamic Post Composer</h2>

      <h3>Select Platform</h3>

      <div className="platforms">
        {platforms.map((platform) => (
          <label key={platform} className="platform-option">
            <input
              type="radio"
              name="platform"
              value={platform}
              checked={selected === platform}
              onChange={() => handlePlatform(platform)}
            />
            {platform}
          </label>
        ))}
      </div>

      <textarea
        rows="8"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      {/* Character Counter */}
      <p className="counter">
        {selected
          ? `${post.length} / ${limits[selected]}`
          : `${post.length} characters`}
      </p>

      {/* Image Upload - Only for Instagram */}
      {selected === "Instagram" && (
        <div className="image-upload">
          <label>
            <strong>Upload Image:</strong>
          </label>
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0]);
              } else {
                setImage(null);
              }
            }}
          />

          {image && (
            <p className="file-name">
              Selected File: {image.name}
            </p>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="button-group">
        <button className="draft-btn" onClick={saveDraft}>
          💾 Save Draft
        </button>

        <button
          className="publish-btn"
          disabled={errors.length > 0}
          onClick={() => alert("🎉 Post Published Successfully!")}
        >
          🚀 Publish
        </button>
      </div>

      {/* Validation */}
      {errors.length > 0 ? (
        <div className="error-box">
          {errors.map((error, index) => (
            <p key={index} className="error">
              ❌ {error}
            </p>
          ))}
        </div>
      ) : (
        selected && (
          <p className="success">
            ✅ Ready to Publish!
          </p>
        )
      )}
    </div>
  );
}

export default PostComposer;