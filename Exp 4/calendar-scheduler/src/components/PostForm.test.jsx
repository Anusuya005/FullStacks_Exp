import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from
  "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../redux/postsSlice";
import PostForm from "./PostForm";


function renderPostForm() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <PostForm />
    </Provider>
  );
}


describe("PostForm", () => {

  it("renders the form", () => {
    renderPostForm();

    expect(
      screen.getByText("Schedule a Post")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Post Title")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Date")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Time")
    ).toBeInTheDocument();
  });


  it("allows the user to enter post information", async () => {

    const user = userEvent.setup();

    renderPostForm();

    const title =
      screen.getByLabelText("Post Title");

    const date =
      screen.getByLabelText("Date");

    const time =
      screen.getByLabelText("Time");

    await user.type(
      title,
      "React Performance Test"
    );

    await user.type(
      date,
      "2026-08-28"
    );

    await user.type(
      time,
      "10:00"
    );

    expect(title).toHaveValue(
      "React Performance Test"
    );

    expect(date).toHaveValue(
      "2026-08-28"
    );

    expect(time).toHaveValue(
      "10:00"
    );
  });

});