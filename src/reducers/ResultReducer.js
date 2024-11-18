import { actions } from "../actions";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const resultReducer = (state, action) => {
  switch (action.type) {
    case actions.result.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case actions.result.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case actions.result.DATA_FETCHING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export { initialState, resultReducer };
