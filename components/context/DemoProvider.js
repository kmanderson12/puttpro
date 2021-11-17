import { createContext, useReducer } from 'react';
import initialState from './initialState';

const store = createContext(initialState);
const { Provider } = store;

const ADD_ITEM = 'ADD_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM:
      const updatedItems = updateObjectInArray(state.items, action);
      return {
        ...state,
        items: updatedItems,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: removeItem(state.items, action),
      };
    default:
      return state;
  }
};

const DemoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, DemoProvider, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM };

// Helper Functions
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (item.id !== action.payload.id) {
      return item;
    }
    return {
      ...item,
      ...action.payload,
    };
  });
}

function removeItem(array, action) {
  return array.filter((item, index) => item.id !== action.payload.id);
}
