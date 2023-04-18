import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { PodcastDetailPage } from "../../src/pages/PodcastDetailPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const wrapper = (
  <MemoryRouter initialEntries={["/podcast/1535809341"]}>
    <Routes>
      <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
    </Routes>
  </MemoryRouter>
);

describe("<PodcastDetailPage />", () => {
  beforeEach(() => {
    render(wrapper);
  });
  afterEach(cleanup);

  it("should match the snapshot", () => {
    const { container } = render(wrapper);
    expect(container).toMatchSnapshot();
  });

  it("should render 'LOADING...'", () => {
    screen.getAllByText(/loading/i);
  });

  it("should render EPISODES", async () => {
    await waitFor(() => {
      screen.getAllByText(/episodes/i);
    });
  });

  it("should render 1 image", async () => {
    await waitFor(() => {
      expect(screen.getAllByRole("img")).toHaveLength(1);
      screen.getByAltText(
        "The Joe Budden Podcast - The Joe Budden Network picture",
      );
    });
  });

  it("should render description", async () => {
    await waitFor(() => {
      screen.getByText(/description/i);
      screen.getByText(
        "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.",
      );
    });
  });

  it("should render a episode", async () => {
    await waitFor(() => {
      screen.getByRole("link", { name: /Episode 618 | "They Got Us"/i });
      screen.getByText("15/4/2023");
      screen.getByText("177:53");
    });
  });

});
