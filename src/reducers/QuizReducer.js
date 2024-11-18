import { actions } from "../actions";

const initialState = {
  quiz: {},
  answers: {},
  loading: false,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case actions.quiz.DATA_FETCHING:
      return { ...state, loading: true };

    case actions.quiz.DATA_FETCHED:
      return { ...state, loading: false, quiz: action.data };

    case actions.quiz.ANSWER_SELECTED:
      return {
        ...state,
        loading: false,
        answers: { ...state.answers, ...action.data },
      };

    case actions.quiz.ANSWER_SUBMITTED:
      return {
        ...state,
        loading: false,
        answers: action.data,
      };

    default:
      return state;
  }
};

export { initialState, quizReducer };
