import React from "react";

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
};

const handleEqual = (state) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);

  if (operator === "/") {
    return {
      ...initialState,
      currentValue: previous / current,
    };
  }

  if (operator === "*") {
    return {
      ...initialState,
      currentValue: previous * current,
    };
  }

  if (operator === "+") {
    return {
      ...initialState,
      currentValue: previous + current,
    };
  }

  if (operator === "-") {
    return {
      ...initialState,
      currentValue: previous - current,
    };
  }

  return state;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "number": {
      const currentValue =
        state.currentValue === "0"
          ? `${action.value}`
          : `${state.currentValue}${action.value}`;

      return {
        ...state,
        currentValue,
      };
    }
    case "operator":
      return {
        ...state,
        operator: action.value,
        previousValue: state.currentValue,
        currentValue: "0",
      };
    case "clear":
      return initialState;
    case "posneg":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case "percentage":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case "equal":
      return handleEqual(state);
    default:
      return state;
  }
};

export const useCalculator = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const pressNumber = (value) => dispatch({ type: "number", value });
  const pressOperator = (value) => dispatch({ type: "operator", value });
  const pressClear = () => dispatch({ type: "clear" });
  const pressPosNeg = () => dispatch({ type: "posneg" });
  const pressPercentage = () => dispatch({ type: "percentage" });
  const pressEqual = () => dispatch({ type: "equal" });

  return {
    pressNumber,
    pressOperator,
    pressClear,
    pressPosNeg,
    pressPercentage,
    pressEqual,
    currentValue: state.currentValue,
  };
};
