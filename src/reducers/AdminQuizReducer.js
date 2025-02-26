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

    case actions.adminQuiz.QUIZ_TOPIC_SUBMITTED:
      return {
        ...state,
        loading: false,
        quiz: [...state.quiz, action.data],
      };

    case actions.adminQuiz.QUESTION_SUBMITTED:
      return {
        ...state,
        loading: false,
        quiz: state.quiz.map((quiz) =>
          quiz.id === action.data.id
            ? { ...quiz, Questions: [...quiz.Questions, action.data] }
            : quiz
        ),
      };

    case actions.adminQuiz.QUIZ_DELETED:
      return {
        ...state,
        loading: false,
        quiz: state.quiz.filter((quiz) => quiz.id !== action.id),
      };

    default:
      return state;
  }
};

export { adminQuizReducer, initialState };
