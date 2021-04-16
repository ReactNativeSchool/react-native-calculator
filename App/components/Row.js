import React from "react";
import { View } from "react-native";

export const Row = ({ children }) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);
