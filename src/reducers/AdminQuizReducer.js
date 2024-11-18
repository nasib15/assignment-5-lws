import { actions } from "../actions";

const initialState = {
  quiz: [],
  loading: false,
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

    default:
      return state;
  }
};

export { adminQuizReducer, initialState };
