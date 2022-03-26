import { View, Text } from "react-native";
import React from "react";
import { useTrainContext } from "../contexts/TrainContext";
import { useFocusEffect } from "@react-navigation/native";
import { fullContainer, title } from "../data/styles";
import tw from "twrnc";
import { ActivityIndicator } from "react-native-paper";

export function TrainDetailPage() {
  const { trainData, trainComposition, activeTrainID, updateTrainData } =
    useTrainContext();

  useFocusEffect(() => {
    const timer = setInterval(() => {
      console.log("update");
      if (activeTrainID !== undefined) updateTrainData();
    }, 15000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <View style={fullContainer}>
      {trainData !== undefined ? (
        <>
          <Text style={title}>{trainData.vehicle}</Text>
        </>
      ) : (
        <ActivityIndicator
          style={tw`absolute top-1/2 left-1/2 right-1/2`}
          animating={true}
          size={"large"}
          color={"white"}
        />
      )}
    </View>
  );
}
