import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { HomePage } from "../../src/pages/HomePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const wrapper = (
  <MemoryRouter>
    <Routes>
      <Route path="/" Component={HomePage} />
    </Routes>
  </MemoryRouter>
);

describe("<HomePage />", () => {
  beforeEach(() => {
    render(wrapper);
  });
  afterEach(cleanup);

  it("should match the snapshot", () => {
    const { container } = render(wrapper);
    expect(container).toMatchSnapshot();
  });

  it("should render 'LOADING...'", () => {
    expect(screen.getByText(/loading/i)).toBeDefined();
  });

  it("should render a searchbox", async () => {
    await waitFor(() => {
      screen.getByRole("searchbox");
    });
  });

  it("should render the whole number of podcasts", async () => {
    await waitFor(() => {
      screen.getByText("100");
    });
  });

  it("should filter searchbox", async () => {
    await waitFor(() => {
      const searchbox = screen.getByPlaceholderText(/filter podcasts/i);
      fireEvent.change(searchbox, { target: { value: "joe" } });
      screen.getAllByText(/joe/i);
      expect(screen.queryByText(/elvis/i)).toBeNull();
    });
  });

  it("should render images", async () => {
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(100);
    });
  });
});
