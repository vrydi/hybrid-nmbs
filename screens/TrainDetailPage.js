import { View, Text } from "react-native";
import React from "react";
import { Navigation } from "../App";
import { useTrainContext } from "../contexts/TrainContext";

export function TrainDetailPage() {
  const { trainData } = useTrainContext();

  //   const { trainID } = route.params;

  // useFocusEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log("update");
  //     if (selectedStationID !== undefined) updateSelectedStationData();
  //   }, 30000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // });

  return (
    <View>
      {trainData !== undefined ? (
        <Text>{trainData.vehicle}</Text>
      ) : (
        <Text>Loading</Text>
      )}
    </View>
  );
}
