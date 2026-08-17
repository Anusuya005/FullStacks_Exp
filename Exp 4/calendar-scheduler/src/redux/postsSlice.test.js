import { describe, expect, it } from "vitest";

import postsReducer, {
  addPost,
  updatePost,
  deletePost,
  reschedulePost,
} from "./postsSlice";

describe("postsSlice", () => {

  it("adds a new post", () => {
    const initialState = [];

    const post = {
      id: "10",
      title: "Testing Post",
      start: "2026-08-25T10:00:00",
      end: "2026-08-25T11:00:00",
    };

    const state = postsReducer(
      initialState,
      addPost(post)
    );

    expect(state).toHaveLength(1);
    expect(state[0].title).toBe(
      "Testing Post"
    );
  });


  it("updates an existing post", () => {
    const initialState = [
      {
        id: "1",
        title: "Old Title",
        start: "2026-08-25T10:00:00",
        end: "2026-08-25T11:00:00",
      },
    ];

    const state = postsReducer(
      initialState,
      updatePost({
        id: "1",
        title: "Updated Title",
      })
    );

    expect(state[0].title).toBe(
      "Updated Title"
    );
  });


  it("deletes a post", () => {
    const initialState = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
    ];

    const state = postsReducer(
      initialState,
      deletePost("1")
    );

    expect(state).toHaveLength(1);
    expect(state[0].id).toBe("2");
  });


  it("reschedules a post", () => {
    const initialState = [
      {
        id: "1",
        title: "Meeting",
        start: "2026-08-25T10:00:00",
        end: "2026-08-25T11:00:00",
      },
    ];

    const state = postsReducer(
      initialState,
      reschedulePost({
        id: "1",
        start: "2026-08-26T14:00:00",
        end: "2026-08-26T15:00:00",
      })
    );

    expect(state[0].start).toBe(
      "2026-08-26T14:00:00"
    );

    expect(state[0].end).toBe(
      "2026-08-26T15:00:00"
    );
  });

});