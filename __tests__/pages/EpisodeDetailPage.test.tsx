import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { EpisodeDetailPage } from "../../src/pages/EpisodeDetailPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const wrapper = (
  <MemoryRouter initialEntries={["/podcast/1535809341/episode/1000609059022"]}>
    <Routes>
      <Route
        path="/podcast/:podcastId/episode/:episodeId"
        element={<EpisodeDetailPage />}
      />
    </Routes>
  </MemoryRouter>
);

describe("<EpisodeDetailPage />", () => {
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
      screen.getByText(/they got us/i);
      screen.getByText(/killing of Cash App’s founder Bob Lee/i);
    });
  });

  it("should render an audio player", async () => {
    await waitFor(() => {
      screen.getByLabelText(/audio-player/i);
    });
  });
});
