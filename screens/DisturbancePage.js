import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  regular,
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

  useEffect(() => {
    fetchDisturbances();
  }, []);

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
            <Icon name="warning" color="white" />
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
            <Icon
              name={"account-hard-hat"}
              type="material-community"
              color={"white"}
            />
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
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen(!open);
  return (
    <View style={tw`px-5`}>
      <Pressable style={flexBox} onPress={() => toggleOpen()}>
        <Text style={collapsibleButtonTitle}>{dist.title}</Text>
        <Icon
          name={open ? "chevron-down" : "chevron-up"}
          type="ionicon"
          color={"white"}
        />
      </Pressable>
      <Collapsible collapsed={open} style={collapsibleButtonContent}>
        <Text style={regular}>{dist.description}</Text>
        <ScrollView>
          {dist.descriptionLinks.descriptionLink.map((desc, i) => {
            <Text
              key={i}
              style={bold}
              onPress={() => Linking.openURL(desc.link)}
            >
              {desc.Text}
            </Text>;
          })}
        </ScrollView>
      </Collapsible>
    </View>
  );
}
