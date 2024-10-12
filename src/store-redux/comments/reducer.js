export const initialState = {
  data: [],
  waiting: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: [], waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/create-success':
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };

    case 'comments/load-error':
    case 'comments/create-error':
      return { ...state, waiting: false };

    default:
      return state;
  }
}

export default reducer;
