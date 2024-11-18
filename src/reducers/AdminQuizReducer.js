import { actions } from "../actions";

const initialState = {
  quiz: [],
  loading: false,
  error: null,
};

const adminQuizReducer = (state, action) => {
  switch (action.type) {
    case actions.adminQuiz.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case actions.adminQuiz.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        quiz: action.data,
      };

    case actions.adminQuiz.DATA_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export { adminQuizReducer, initialState };
