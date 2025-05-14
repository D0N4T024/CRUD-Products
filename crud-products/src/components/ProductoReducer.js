export const productoReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [...state, action.payload];
    case 'UPDATE':
      return state.map((prod) =>
        prod.id === action.payload.id ? action.payload : prod
      );
    case 'DELETE':
      return state.filter((prod) => prod.id !== action.payload);
    default:
      return state;
  }
};
