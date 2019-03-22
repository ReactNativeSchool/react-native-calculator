import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const buttonWidth = width / 4;

const styles = StyleSheet.create({
  text: {
    color: "#020205",
    fontSize: 25
  },
  textWhite: {
    color: "#fff"
  },
  button: {
    backgroundColor: "#CFD0D4",
    flex: 1,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
    height: buttonWidth
  },
  orange: {
    backgroundColor: "#FA7900"
  },
  dark: {
    backgroundColor: "#C5C6C8"
  }
});

export default ({ onPress = () => alert("todo!"), text, theme, size }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (theme === "orange") {
    buttonStyles.push(styles.orange);
    textStyles.push(styles.textWhite);
  } else if (theme === "dark") {
    buttonStyles.push(styles.dark);
  }

  if (size === "double") {
    // Width / 2 - 2 for margin
    buttonStyles.push({
      width: width / 2 - 2,
      flex: 0
    });
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
