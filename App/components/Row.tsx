import React, { FunctionComponent } from "react";
import { View } from "react-native";

export const Row: FunctionComponent = ({ children }) => (
  <View style={{ flexDirection: "row" }}>{children}</View>
);
