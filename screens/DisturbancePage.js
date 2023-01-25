import { View, Text, Pressable, Linking, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bold,
  collapsibleButtonContent,
  collapsibleButtonTitle,
  darkContainer,
  divider,
  flexBox,
  fullContainer,
  list,
  regular,
  title,
} from "../data/styles";
import { Icon } from "react-native-elements";
import Collapsible from "react-native-collapsible";
import { useDisturbanceContext } from "../contexts/DisturbancesContext";
import { Divider, List } from "react-native-paper";
import tw from "twrnc";

export default function DisturbancePage() {
  const [activeAccordion, setActiveAccordion] = useState("");
  const { workDisturbances, defectDisturbances, fetchDisturbances } =
    useDisturbanceContext();

  useEffect(() => {
    fetchDisturbances();
  }, []);

  const toggleAccordion = (id) => {
    if (activeAccordion === id) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(id);
    }
  };

  return (
    <SafeAreaView style={fullContainer}>
      <Text style={title}>Storingen</Text>
      <List.AccordionGroup
        onAccordionPress={(id) => toggleAccordion(id)}
        expandedId={activeAccordion}
      >
        <List.Accordion
          id={"storingen"}
          title="Storingen"
          titleStyle={collapsibleButtonTitle}
          style={darkContainer}
          descriptionStyle={list}
          left={() => <Icon name="warning" color="white" />}
          right={() => (
            <Icon
              name={
                activeAccordion === "storingen" ? "chevron-down" : "chevron-up"
              }
              color="white"
              type="ionicon"
            />
          )}
        >
          <FlatList
            data={defectDisturbances}
            renderItem={({ item }) => <DistListEl dist={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider style={divider} />}
            ListEmptyComponent={() => (
              <List.Item title="Geen Storingen" titleStyle={regular} />
            )}
            style={tw`px-0 w-full`}
          />
        </List.Accordion>

        <List.Accordion
          id={"werken"}
          title="Werken / geplande werken"
          titleStyle={collapsibleButtonTitle}
          style={darkContainer}
          descriptionStyle={list}
          left={() => (
            <Icon
              name="account-hard-hat"
              color="white"
              type="material-community"
            />
          )}
          right={() => (
            <Icon
              name={
                activeAccordion === "werken" ? "chevron-down" : "chevron-up"
              }
              color="white"
              type="ionicon"
            />
          )}
        >
          <FlatList
            data={workDisturbances}
            renderItem={({ item }) => <DistListEl dist={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <Divider style={divider} />}
            ListEmptyComponent={() => (
              <List.Item title="Geen Werken" titleStyle={regular} />
            )}
            style={tw`px-0 w-full`}
          />
        </List.Accordion>
      </List.AccordionGroup>
    </SafeAreaView>
  );
}

function DistListEl(props) {
  const { dist } = props;
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen(!open);
  return (
    <View style={tw`px-5 `}>
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
        {dist.descriptionLinks.descriptionLink.map((desc, i) => {
          <Text key={i} style={bold} onPress={() => Linking.openURL(desc.link)}>
            {desc.Text}
          </Text>;
        })}
      </Collapsible>
    </View>
  );
}
