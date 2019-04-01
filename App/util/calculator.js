export const handleNumber = (
  value,
  { currentValue, previousValue, operator }
) => {
  if (currentValue === "0") {
    return { currentValue: value.toString() };
  }

  // Is this right?
  if (previousValue === null && operator !== null) {
    return {
      currentValue: value.toString(),
      previousValue: currentValue
    };
  }

  return {
    currentValue: `${currentValue}${value}`
  };
};

export const handleEqual = (value, state) => {
  const { currentValue, previousValue, operator } = state;
  if (operator === null || previousValue === null) {
    return state;
  }

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue);
  const resetState = {
    previousValue: null,
    operator: null
  };

  if (operator === "/") {
    return {
      currentValue: previous / current,
      ...resetState
    };
  }

  if (operator === "+") {
    return {
      currentValue: previous + current,
      ...resetState
    };
  }

  if (operator === "-") {
    return {
      currentValue: previous - current,
      ...resetState
    };
  }

  if (operator === "*") {
    return {
      currentValue: previous * current,
      ...resetState
    };
  }

  return state;
};

const calculator = (action, state) => {
  switch (action.type) {
    case "number":
      return handleNumber(action.value, state);
    case "clear":
      return { currentValue: "0", previousValue: null, operator: null };
    case "posneg":
      return {
        currentValue: (parseFloat(state.currentValue) * -1).toString()
      };
    case "percentage":
      return {
        currentValue: (parseFloat(state.currentValue) * 0.01).toString()
      };
    case "operator":
      return {
        operator: action.value,
        previousValue: state.currentValue,
        currentValue: "0"
      };
    case "equal":
      return handleEqual(action.value, state);
    default:
      return state;
  }
};

export default calculator;
