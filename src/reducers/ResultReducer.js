import { actions } from "../actions";

const initialState = {
  data: {},
  loading: false,
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

    default:
      return state;
  }
};

export { initialState, resultReducer };
