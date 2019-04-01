import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const buttonWidth = width / 4;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 25
  },
  textDark: {
    color: "#060606"
  },
  button: {
    backgroundColor: "#333333",
    flex: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    height: Math.floor(buttonWidth - 10), // buttonWidth (approx) - (margin * 2)
    borderRadius: Math.floor(buttonWidth) // use Math.floor to avoid splitting in button on iOS
  },
  buttonDouble: {
    width: width / 2 - 10,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40 // just approximating
  },
  orange: {
    backgroundColor: "#f09a36"
  },
  secondary: {
    backgroundColor: "#a6a6a6"
  }
});

export default ({ onPress = () => alert("todo!"), text, theme, size }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (theme === "orange") {
    buttonStyles.push(styles.orange);
  } else if (theme === "secondary") {
    buttonStyles.push(styles.secondary);
    textStyles.push(styles.textDark);
  }

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      activeOpacity={0.9}
    >
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
