import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  MaskedViewBase,
  Pressable,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./screens/HomePage";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  NAV_ELEMENTS,
  NAV_HOME,
  NAV_STATION_SEARCH,
  PAGE_TRAIN_DETAIL,
} from "./data/NavigationConstants";
import tw from "twrnc";
import { flexBox, flexColumn, navBar, nmbsBlueDark } from "./data/styles";
import { StationProvider } from "./contexts/StationContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TrainDetailPage } from "./screens/TrainDetailPage";
import { TrainProvider } from "./contexts/TrainContext";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StationProvider>
      <TrainProvider>
        <ProvidedApp />
      </TrainProvider>
    </StationProvider>
  );
}

function ProvidedApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={"HomeStack"}
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"StationSearchStack"}
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={PAGE_TRAIN_DETAIL} component={TrainDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Navigation() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: nmbsBlueDark }}>
      {NAV_ELEMENTS.map((nav, i) => (
        <Tab.Screen
          key={i}
          name={nav.name}
          component={nav.component}
          options={{
            tabBarLabel: nav.name.toUpperCase(),
            tabBarIcon: () => <Icon name={nav.icon} color={nav.color} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
