import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import {
  bold,
  collapsibleButtonContent,
  container,
  darkContainerFull,
  darkContainer,
  divider,
  error,
  errorBold,
  flexBox,
  flushTitle,
  fullContainer,
  regular,
  subTitle,
} from "../data/styles";
import { useConnectionContext } from "../contexts/ConnectionContext";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import StopsOverview from "../components/StopsOverview";
import { Divider, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConnectionPage() {
  const { connectionInfo } = useConnectionContext();

  return (
    <View style={darkContainerFull}>
      <View style={tw`py-2`}>
        <Text style={flushTitle}>{connectionInfo[0].departure.station}</Text>
        <Icon
          name="arrow-down-outline"
          type="ionicon"
          size={30}
          color={"white"}
        />
        <Text style={flushTitle}>{connectionInfo[0].arrival.station}</Text>
      </View>
      <FlatList
        data={connectionInfo}
        keyExtractor={(item) => item.id + item.departure.time}
        renderItem={({ item }) => <ConnectionAccordion connection={item} />}
      />
    </View>
  );
}

function ConnectionAccordion({ connection }) {
  const depTime = new Date(0);
  depTime.setUTCSeconds(connection.departure.time);
  if (connection.departure.delay > 0) {
    depTime.setUTCSeconds(depTime.getUTCSeconds() + connection.departure.delay);
  }
  const arrTime = new Date(0);
  arrTime.setUTCSeconds(connection.arrival.time);
  if (connection.arrival.delay > 0) {
    arrTime.setUTCSeconds(arrTime.getUTCSeconds() + connection.arrival.delay);
  }

  return (
    <>
      <List.Accordion
        title={<HeaderTrains connection={connection} />}
        titleStyle={flexBox}
        left={() => (
          <Text style={connection.departure.delay > 0 ? errorBold : bold}>
            {depTime.toLocaleTimeString().slice(0, 5)}
          </Text>
        )}
        right={() => (
          <Text style={connection.arrival.delay > 0 ? errorBold : bold}>
            {arrTime.toLocaleTimeString().slice(0, 5)}
          </Text>
        )}
        style={darkContainer}
        id={connection.departure.time}
      >
        <ConnectionEL connection={connection} />
      </List.Accordion>
      <Divider style={divider} />
    </>
  );
}

function HeaderTrains({ connection }) {
  return (
    <View style={tw`w-[210px] flex flex-row items-center`}>
      <TrainEl type={connection.departure.vehicleinfo.type} />
      {connection.vias && (
        <>
          {connection.vias.via.map((via) => (
            <TrainEl type={via.departure.vehicleinfo.type} key={via} />
          ))}
        </>
      )}
    </View>
  );
}

function TrainEl({ type }) {
  const colour = type.includes("S")
    ? "bg-yellow-500"
    : type.includes("IC")
    ? "bg-blue-500"
    : "bg-blue-700";

  return (
    <>
      <Icon
        name={"train"}
        size={15}
        style={tw`p-2 rounded-100 w-[30px] h-[30px] ${colour}`}
      />
      <View style={tw`flex-grow ${colour} h-[5px]`} />
    </>
  );
}

function ConnectionEL({ connection }) {
  const depTime = new Date(0);
  depTime.setUTCSeconds(connection.arrival.time);

  return (
    <View style={container}>
      <StationHeader
        station={connection.departure}
        stationName={connection.departure.station}
      />
      {connection.departure.stops && (
        <>
          {connection.departure.stops.stop.map((stop) => (
            <StopsOverview trainStop={stop} key={stop.id} />
          ))}
        </>
      )}
      {connection.vias && (
        <FlatList
          data={connection.vias.via}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ViaComponent via={item} />}
        />
      )}
      <Text style={flushTitle}>{connection.arrival.station}</Text>
      <ArrDepDetails
        type="Aankomst"
        platform={connection.arrival.platform}
        time={depTime}
        delay={connection.arrival.delay}
      />
    </View>
  );
}

function ViaComponent({ via }) {
  const arrTime = new Date(0);
  arrTime.setUTCSeconds(via.arrival.time);

  return (
    <>
      <ViaHeader station={via.departure} stationName={via.station} />
      {via.departure.stops && (
        <FlatList
          data={via.departure.stops.stop}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StopsOverview trainStop={item} />}
        />
      )}
    </>
  );
}

function StationHeader(props) {
  const { station, stationName } = props;
  const depTime = new Date(0);
  depTime.setUTCSeconds(station.time);
  return (
    <View>
      <Text style={flushTitle}>{stationName}</Text>
      <Text style={tw`text-white text-center font-bold text-[16px]`}>
        Richting: {station.direction.name}
      </Text>
      <ArrDepDetails
        type="Vertrek"
        platform={station.platform}
        time={depTime}
        delay={station.delay}
      />
    </View>
  );
}

function ViaHeader(props) {
  const { station, stationName } = props;
  const depTime = new Date(0);
  depTime.setUTCSeconds(station.time);
  const arrTime = new Date(0);
  arrTime.setUTCSeconds(station.arrivaltime);
  return (
    <View>
      <View style={tw`flex flex-row justify-center px-3 items-center`}>
        <Icon name="transit-transfer" type="material-community" color="white" />
        <Text style={tw`grow text-white text-4xl font-bold text-center`}>
          {stationName}
        </Text>
      </View>
      <Text style={tw`text-white text-center font-bold text-[16px]`}>
        Richting: {station.direction.name}
      </Text>
      <ArrDepDetails
        type="Vertrek"
        platform={station.platform}
        time={depTime}
        delay={station.delay}
      />
    </View>
  );
}

function ArrDepDetails({ type, platform, time, delay }) {
  return (
    <View style={tw`flex flex-row justify-between items-center px-5`}>
      <Text style={regular}>Perron: {platform}</Text>
      <View style={tw`flex flex-row`}>
        <Text style={bold}>{type}: </Text>
        <Text style={bold}>{time.toLocaleTimeString().slice(0, 5)} </Text>
        <Text style={error}>{delay > 0 ? `+${delay / 60}` : ""}</Text>
      </View>
    </View>
  );
}
