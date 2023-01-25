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
  divider,
  error,
  flexBox,
  flushTitle,
  fullContainer,
  regular,
  title,
} from "../data/styles";
import { useConnectionContext } from "../contexts/ConnectionContext";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import StopsOverview from "../components/StopsOverview";

export default function ConnectionPage() {
  const { connectionInfo } = useConnectionContext();
  return (
    <View style={fullContainer}>
      <View style={tw`pb-5 pt-2`}>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConnectionEL connection={item} />}
        ItemSeparatorComponent={() => <View style={divider} />}
      />
    </View>
  );
}

function Header(props) {
  const { connection } = props;

  const depTime = new Date(0);
  depTime.setUTCSeconds(connection.departure.time);
  const arrTime = new Date(0);
  arrTime.setUTCSeconds(connection.arrival.time);

  return (
    <View style={flexBox}>
      <Text style={bold}>{depTime.toLocaleTimeString().slice(0, 5)}</Text>
      <View style={tw`flex-1 flex-row px-2 justify-between`}>
        <View style={tw`flex-1`}>
          <Icon
            style={tw`p-2 rounded-100 w-[30px] h-[30px] ${
              connection.departure.vehicleinfo.type.includes("S")
                ? "bg-yellow-500"
                : connection.departure.vehicleinfo.type.includes("IC")
                ? "bg-blue-500"
                : "bg-blue-700"
            }`}
            name={"train"}
            size={15}
          />
          <View
            style={tw`grow h-[5px] ml-[30px] relative -top-1/2 -z-10 ${
              connection.departure.vehicleinfo.type.includes("S")
                ? "bg-yellow-500"
                : connection.departure.vehicleinfo.type.includes("IC")
                ? "bg-blue-500"
                : "bg-blue-700"
            }`}
          />
        </View>
        {connection.vias && (
          <>
            {connection.vias.via.map((via) => (
              <View style={tw`flex-1`} key={via}>
                <Icon
                  style={tw`p-2 rounded-100 w-[30px] h-[30px] ${
                    via.departure.vehicleinfo.type.includes("S")
                      ? "bg-yellow-500"
                      : via.departure.vehicleinfo.type.includes("IC")
                      ? "bg-blue-500"
                      : "bg-blue-700"
                  }`}
                  name={"train"}
                  size={15}
                />
                <View
                  style={tw`grow h-[5px] ml-[30px] relative -top-1/2 -z-10 ${
                    via.departure.vehicleinfo.type.includes("S")
                      ? "bg-yellow-500"
                      : via.departure.vehicleinfo.type.includes("IC")
                      ? "bg-blue-500"
                      : "bg-blue-700"
                  }`}
                />
              </View>
            ))}
          </>
        )}
      </View>
      <Text style={bold}>{arrTime.toLocaleTimeString().slice(0, 5)}</Text>
    </View>
  );
}

function ConnectionEL(props) {
  const { connection } = props;
  const [closed, setClosed] = useState(true);

  console.log("connection", connection.vias);

  return (
    <>
      <TouchableOpacity style={tw`py-5`} onPress={() => setClosed(!closed)}>
        <Header connection={connection} />
      </TouchableOpacity>
      <Collapsible collapsed={closed} style={collapsibleButtonContent}>
        <StationHeader
          station={connection.departure}
          stationName={connection.departure.station}
        />
        {connection.departure.stops && (
          <FlatList
            data={connection.departure.stops.stop}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StopsOverview trainStop={item} />}
          />
        )}
        {connection.vias && (
          <ScrollView>
            {connection.vias.via.map((via, i) => (
              <ViaComponent via={via} key={i} />
            ))}
          </ScrollView>
        )}

        <Text style={flushTitle}>{connection.arrival.station}</Text>
      </Collapsible>
    </>
  );
}

function ViaComponent(props) {
  const { via } = props;
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
      <View style={tw`flex-row justify-between px-5`}>
        <Text style={regular}>Perron: {station.platform}</Text>
        <View style={tw`flex w-1/5 flex-row justify-between`}>
          <Text style={bold}>{depTime.toLocaleTimeString().slice(0, 5)}</Text>
          <Text style={error}>
            {station.delay > 0 ? `+${station.delay / 60}` : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ViaHeader(props) {
  const { station, stationName } = props;
  const depTime = new Date(0);
  depTime.setUTCSeconds(station.time);
  console.log("via station", station);
  return (
    <View>
      <View style={tw`flex flex-row justify-center px-3 items-center`}>
        <Icon name="transit-transfer" type="material-community" color="white" />
        <Text style={tw`grow text-white text-4xl font-bold text-center`}>
          {stationName}
        </Text>
      </View>
      <View style={tw`flex flex-row justify-between items-center px-5`}>
        <Text style={regular}>Perron: {station.platform}</Text>
        <View style={tw`flex w-2/5 flex-row justify-between`}>
          <Text style={bold}>
            Vertrek: {depTime.toLocaleTimeString().slice(0, 5)},
          </Text>
          <Text style={error}>
            {station.delay > 0 ? `+${station.delay / 60}` : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}
