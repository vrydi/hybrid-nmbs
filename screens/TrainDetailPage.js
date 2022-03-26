import { View, Text } from "react-native";
import React from "react";
import { Navigation } from "../App";

export function TrainDetailPage({ route }) {
  const { trainID } = route.params;
  return (
    <View>
      <Text>{trainID}</Text>
    </View>
  );
}
