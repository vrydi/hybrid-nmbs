import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { regular } from "../data/styles";

export default function StopsOverview(props) {
  const { trainStop, selectedStationID } = props;
  const arrived =
    trainStop.arrived === "1" ||
    (selectedStationID !== undefined && trainStop.id === "0");

  const departureTime = new Date(0);
  departureTime.setUTCSeconds(trainStop.scheduledDepartureTime);
  return (
    <View style={tw`py-1 w-8/9 mx-auto flex-row`}>
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
