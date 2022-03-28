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
  flexBox,
  flushTitle,
  fullContainer,
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
        {connection.vias.via.map((via) => (
          <View style={tw`flex-1`}>
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
      </View>
      <Text style={bold}>{arrTime.toLocaleTimeString().slice(0, 5)}</Text>
    </View>
  );
}

function ConnectionEL(props) {
  const { connection } = props;
  const [closed, setClosed] = useState(true);

  return (
    <>
      <TouchableOpacity style={tw`py-5`} onPress={() => setClosed(!closed)}>
        <Header connection={connection} />
      </TouchableOpacity>
      <Collapsible collapsed={closed} style={collapsibleButtonContent}>
        <StationHeader station={connection.departure} />
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
  return <></>;
}

function StationHeader(props) {
  const { station } = props;
  const depTime = new Date(0);
  depTime.setUTCSeconds(station.time);
  return (
    <View>
      <Text style={flushTitle}>{station.station}</Text>
      <View>
        <Text>Perron: {station.platform}</Text>
        <Text>{depTime.toLocaleTimeString().slice(0, 5)}</Text>
      </View>
    </View>
  );
}
