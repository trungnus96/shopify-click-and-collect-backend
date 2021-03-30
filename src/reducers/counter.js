import * as CounterActions from "../actions/counter";

const initialState = {
  value: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CounterActions.INCREASE_COUNT:
      return {
        ...state,
        value: state.value + 1
      };

    default:
      return state;
  }
}
