import React from "react";

type StateType = {
  currentValue: string;
  operator: string | null;
  previousValue: string;
};

enum ActionTypes {
  Number = "number",
  Operator = "operator",
  Clear = "clear",
  Posneg = "posneg",
  Percentage = "percentage",
  Equal = "equal",
}

type Action = {
  type: ActionTypes;
  value?: string;
  operator?: string;
};

const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: "0",
};

const handleEqual = (state: StateType) => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);

  if (operator === "/") {
    return {
      ...initialState,
      currentValue: `${previous / current}`,
    };
  }

  if (operator === "*") {
    return {
      ...initialState,
      currentValue: `${previous * current}`,
    };
  }

  if (operator === "+") {
    return {
      ...initialState,
      currentValue: `${previous + current}`,
    };
  }

  if (operator === "-") {
    return {
      ...initialState,
      currentValue: `${previous - current}`,
    };
  }

  return state;
};

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case ActionTypes.Number: {
      const currentValue =
        state.currentValue === "0"
          ? `${action.value}`
          : `${state.currentValue}${action.value}`;

      return {
        ...state,
        currentValue,
      };
    }
    case ActionTypes.Operator: {
      return {
        ...state,
        operator: action.operator || initialState.operator,
        previousValue: state.currentValue,
        currentValue: "0",
      };
    }
    case ActionTypes.Clear:
      return initialState;
    case ActionTypes.Posneg:
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * -1}`,
      };
    case ActionTypes.Percentage:
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
      };
    case ActionTypes.Equal:
      return handleEqual(state);
    default:
      return state;
  }
};

export const useCalculator = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const pressNumber = (value: string) =>
    dispatch({ type: ActionTypes.Number, value });
  const pressOperator = (operator: string) =>
    dispatch({ type: ActionTypes.Operator, operator });
  const pressClear = () => dispatch({ type: ActionTypes.Clear });
  const pressPosNeg = () => dispatch({ type: ActionTypes.Posneg });
  const pressPercentage = () => dispatch({ type: ActionTypes.Percentage });
  const pressEqual = () => dispatch({ type: ActionTypes.Equal });

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
