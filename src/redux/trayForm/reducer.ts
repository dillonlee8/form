import { SET_TRAYFORM_VALUES } from "./actionTypes";

const initialState = {
  values: {}
};

export default function trayFormReducer(state = initialState, action: Record<'type' | 'payload', any>) {
  switch (action.type) {
    case SET_TRAYFORM_VALUES: {
      const { values } = action.payload;
      console.log('VALUES:', values)
      return {
        ...state,
        values
      };
    }
    default:
      return state;
  }
}
