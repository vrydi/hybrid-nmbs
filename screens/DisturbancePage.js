import { View, Text, Pressable, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bold,
  button,
  collapsibleButton,
  collapsibleButtonContent,
  collapsibleButtonTitle,
  darkContainer,
  divider,
  flexBox,
  flushTitle,
  fullContainer,
  subTitle,
  title,
} from "../data/styles";
import { Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import { useDisturbanceContext } from "../contexts/DisturbancesContext";
import { Divider } from "react-native-paper";
import tw from "twrnc";

export default function DisturbancePage() {
  const [distOpen, setDistOpen] = useState(true);
  const [workOpen, setWorkOpen] = useState(true);
  const { workDisturbances, defectDisturbances, fetchDisturbances } =
    useDisturbanceContext();

  const toggleDistOpen = () => {
    setDistOpen(!distOpen);
    setWorkOpen(true);
  };
  const toggleWorkOpen = () => {
    setDistOpen(true);
    setWorkOpen(!workOpen);
  };

  return (
    <SafeAreaView style={fullContainer}>
      <Text style={title}>Storingen</Text>
      <ScrollView>
        <View style={darkContainer}>
          <Pressable style={flexBox} onPress={() => toggleDistOpen()}>
            <Text style={collapsibleButtonTitle}>Storingen</Text>
            <Icon
              name={distOpen ? "chevron-down" : "chevron-up"}
              type="ionicon"
              color={"white"}
            />
          </Pressable>
          <Collapsible
            collapsed={distOpen}
            style={collapsibleButtonContent}
            renderChildrenCollapsed={true}
          >
            <FlatList
              data={defectDisturbances}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <DistListEl dist={item} />}
              ItemSeparatorComponent={() => <Divider />}
            />
          </Collapsible>
        </View>
        <View style={darkContainer}>
          <Pressable style={flexBox} onPress={() => toggleWorkOpen()}>
            <Text style={collapsibleButtonTitle}>Werken / geplande werken</Text>
            <Icon
              name={workOpen ? "chevron-down" : "chevron-up"}
              type="ionicon"
              color={"white"}
            />
          </Pressable>
          <Collapsible
            collapsed={workOpen}
            style={collapsibleButtonContent}
            renderChildrenCollapsed={true}
          >
            <FlatList
              data={workDisturbances}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <DistListEl dist={item} />}
              ItemSeparatorComponent={() => <View style={divider} />}
            />
          </Collapsible>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DistListEl(props) {
  const { dist } = props;
  return (
    <View style={tw`p-5`}>
      <Text style={bold}>{dist.title}</Text>
    </View>
  );
}
