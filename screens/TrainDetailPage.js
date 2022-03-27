import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { useTrainContext } from "../contexts/TrainContext";
import { useFocusEffect } from "@react-navigation/native";
import {
  bold,
  flexBox,
  flushTitle,
  fullContainer,
  regular,
  title,
} from "../data/styles";
import tw from "twrnc";
import { ActivityIndicator } from "react-native-paper";
import { Icon } from "react-native-elements";
import { useStationsContext } from "../contexts/StationContext";

export function TrainDetailPage() {
  const { trainData, activeTrainID, updateTrainData } = useTrainContext();

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
          <Header />
          <StopList />
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

function Header() {
  const { trainData } = useTrainContext();
  return (
    <View>
      <Text style={title}>{trainData.stops.stop[0].station}</Text>
      <Icon
        name="arrow-down-outline"
        type="ionicon"
        size={30}
        color={"white"}
      />
      <Text style={flushTitle}>
        {trainData.stops.stop[trainData.stops.stop.length - 1].station}
      </Text>
    </View>
  );
}

function StopList() {
  const { trainData } = useTrainContext();
  return (
    <View>
      <FlatList
        data={trainData.stops.stop}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StopElement trainStop={item} />}
      />
    </View>
  );
}

function StopElement(props) {
  const { trainStop } = props;
  const { selectedStationID } = useStationsContext();

  const arrived = trainStop.arrived === "1" || trainStop.id === "0";

  const departureTime = new Date(0);
  departureTime.setUTCSeconds(trainStop.scheduledDepartureTime);
  return (
    <View style={{ ...flexBox, ...tw`py-1` }}>
      <Icon
        name={arrived ? "ellipse" : "ellipse-outline"}
        type="ionicon"
        style={tw`px-3`}
      />
      <Text
        style={tw` py-1 ${
          arrived ? "text-black border-black" : "text-white border-white"
        } flex-1 ${
          selectedStationID === trainStop.stationinfo.id ? "border-b" : ""
        }`}
      >
        {trainStop.station}
      </Text>
      <View style={tw`flex w-1/5 flex-row justify-between`}>
        <Text style={regular}>
          {departureTime.toLocaleTimeString().slice(0, 5)}
        </Text>
        <Text style={tw`text-red-400 font-bold`}>
          {trainStop.delay > 0 ? `+${trainStop.delay / 60}` : ""}
        </Text>
      </View>
    </View>
  );
}
