import { View, Text, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { bold, divider, flexBox, fullContainer } from "../data/styles";
import { useConnectionContext } from "../contexts/ConnectionContext";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";

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

function ConnectionEL(props) {
  const { connection } = props;
  const [closed, setClosed] = useState(true);

  const depTime = new Date(0);
  depTime.setUTCSeconds(connection.departure.time);
  const arrTime = new Date(0);
  arrTime.setUTCSeconds(connection.arrival.time);
  return (
    <>
      <Pressable style={tw`py-5`}>
        <View style={flexBox}>
          <Text style={bold}>{depTime.toLocaleTimeString().slice(0, 5)}</Text>
          <View style={tw`flex-1 flex-row px-2 justify-between`}>
            {connection.vias.via.map((via, i) => (
              <View style={tw`flex-1`} key={i}>
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
      </Pressable>
      <Collapsible></Collapsible>
    </>
  );
}
