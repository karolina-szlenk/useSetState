import { useReducer, useEffect, useRef } from "react";

const actionTypes = {
  patch: "PATCH",
  update: "UPDATE",
};

const cb = () => {};

const isObject = (arg) => {
  return arg === Object(arg);
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.patch:
      return {
        ...state,
        ...action.payload,
      };
    case actionTypes.update:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const useSetState = (initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setStateCallback = useRef();

  const patchState = (update) =>
    dispatch({ type: actionTypes.patch, payload: update });
  const updateState = (update) =>
    dispatch({ type: actionTypes.update, payload: update(state) });

  useEffect(() => {
    if (typeof setStateCallback.current === "function") {
      setStateCallback.current();
    }
    setStateCallback.current = cb;
  }, [state]);

  const setState = (arg, callback = cb) => {
    setStateCallback.current = callback;
    if (typeof arg === "function") {
      updateState(arg);
    } else if (isObject(arg)) {
      patchState(arg);
    } else {
      throw Error("Invalid argument!");
    }
    console.log(arg);
  };

  return [state, setState];
};

export default useSetState;
