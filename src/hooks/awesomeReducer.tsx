import { useReducer } from "react";

export const awesomeReducer = () => {
  type Action = { type: ENUMS; payload: any };

  enum ENUMS {
    SET_PODCASTS = "SET_PODCASTS",
    SET_EPISODES = "SET_EPISODES",
    SET_ERROR = "SET_ERROR",
  }

  const initialState = {
    podcasts: null,
    episodes: null,
    error: null,
    loadingPodcasts: true,
    loadingEpisodes: true,
  };

  const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
      case ENUMS.SET_PODCASTS:
        return { ...state, podcasts: action.payload, loadingPodcasts: false };
      case ENUMS.SET_EPISODES:
        return { ...state, episodes: action.payload, loadingEpisodes: false };
      case ENUMS.SET_ERROR:
        return {
          ...state,
          error: action.payload,
          loadingPodcasts: false,
          loadingEpisodes: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    ENUMS,
  };
};
