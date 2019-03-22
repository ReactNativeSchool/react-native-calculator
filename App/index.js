import React from "react";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import Button from "./components/Button";
import Row from "./components/Row";

export default class App extends React.Component {
  state = {
    previousValue: null,
    currentValue: "0",
    operator: null
  };

  handleButtonClick = (type, value) => {
    this.setState(state => {
      const { currentValue, previousValue, operator } = state;

      if (type === "number") {
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
      }

      if (type === "clear") {
        return { currentValue: "0", previousValue: null, operator: null };
      }

      if (type === "posneg") {
        return {
          currentValue: (parseFloat(currentValue) * -1).toString()
        };
      }

      if (type === "percentage") {
        return {
          currentValue: (parseFloat(currentValue) * 0.01).toString()
        };
      }

      if (type === "operator") {
        return {
          operator: value,
          previousValue: currentValue,
          currentValue: "0"
        };
      }

      if (type === "equal") {
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
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.value}>
            {parseFloat(this.state.currentValue).toLocaleString()}
          </Text>
          <Row>
            <Button
              text="C"
              theme="dark"
              onPress={() => this.handleButtonClick("clear")}
            />
            <Button
              text="+/-"
              theme="dark"
              onPress={() => this.handleButtonClick("posneg")}
            />
            <Button
              text="%"
              theme="dark"
              onPress={() => this.handleButtonClick("percentage")}
            />
            <Button
              text="/"
              theme="orange"
              onPress={() => this.handleButtonClick("operator", "/")}
            />
          </Row>

          <Row>
            <Button
              text="7"
              onPress={() => this.handleButtonClick("number", 7)}
            />
            <Button
              text="8"
              onPress={() => this.handleButtonClick("number", 8)}
            />
            <Button
              text="9"
              onPress={() => this.handleButtonClick("number", 9)}
            />
            <Button
              text="x"
              theme="orange"
              onPress={() => this.handleButtonClick("operator", "*")}
            />
          </Row>
          <Row>
            <Button
              text="4"
              onPress={() => this.handleButtonClick("number", 4)}
            />
            <Button
              text="5"
              onPress={() => this.handleButtonClick("number", 5)}
            />
            <Button
              text="6"
              onPress={() => this.handleButtonClick("number", 6)}
            />
            <Button
              text="-"
              theme="orange"
              onPress={() => this.handleButtonClick("operator", "-")}
            />
          </Row>
          <Row>
            <Button
              text="1"
              onPress={() => this.handleButtonClick("number", 1)}
            />
            <Button
              text="2"
              onPress={() => this.handleButtonClick("number", 2)}
            />
            <Button
              text="3"
              onPress={() => this.handleButtonClick("number", 3)}
            />
            <Button
              text="+"
              theme="orange"
              onPress={() => this.handleButtonClick("operator", "+")}
            />
          </Row>

          <Row>
            <Button
              text="0"
              size="double"
              onPress={() => this.handleButtonClick("number", 0)}
            />
            <Button
              text="."
              onPress={() => this.handleButtonClick("number", ".")}
            />
            <Button
              text="="
              theme="orange"
              onPress={() => this.handleButtonClick("equal")}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202020",
    flex: 1,
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    textAlign: "right",
    fontSize: 40,
    marginBottom: 10,
    marginRight: 20
  }
});
