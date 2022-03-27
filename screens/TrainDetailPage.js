import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTrainContext } from "../contexts/TrainContext";
import { useFocusEffect } from "@react-navigation/native";
import {
  bold,
  collapsibleButton,
  collapsibleButtonContent,
  collapsibleButtonTitle,
  flexBox,
  flushTitle,
  fullContainer,
  navBar,
  regular,
  title,
} from "../data/styles";
import tw from "twrnc";
import { ActivityIndicator } from "react-native-paper";
import { Icon } from "react-native-elements";
import { useStationsContext } from "../contexts/StationContext";
import Collapsible from "react-native-collapsible";

export function TrainDetailPage() {
  const { trainData, activeTrainID, updateTrainData } = useTrainContext();
  const [collapsedCompositionView, setCollapsedCompositionView] =
    useState(false);

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
      {/* <ScrollView> */}
      {trainData !== undefined ? (
        <>
          <StopList />
          <View style={collapsibleButton}>
            <TouchableOpacity
              onPress={() =>
                setCollapsedCompositionView(!collapsedCompositionView)
              }
              style={flexBox}
            >
              <Text style={collapsibleButtonTitle}>Train composition</Text>
              <Icon
                name={collapsedCompositionView ? "chevron-down" : "chevron-up"}
                type="ionicon"
                color={"white"}
              />
            </TouchableOpacity>
            <Collapsible
              collapsed={collapsedCompositionView}
              style={collapsibleButtonContent}
            >
              <Text>this was collapsed</Text>
            </Collapsible>
          </View>
        </>
      ) : (
        <ActivityIndicator
          style={tw`absolute top-1/2 left-1/2 right-1/2`}
          animating={true}
          size={"large"}
          color={"white"}
        />
      )}
      {/* </ScrollView> */}
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
    <View style={tw`pb-15`}>
      <FlatList
        ListHeaderComponent={Header}
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
