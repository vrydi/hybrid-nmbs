import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./screens/HomePage";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NAV_ELEMENTS } from "./data/NavigationConstants";
import { nmbsBlueDark } from "./data/styles";
import { StationProvider } from "./contexts/StationContext";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <StationProvider>
      <ProvidedApp />
    </StationProvider>
  );
}

function ProvidedApp() {
  return (
    <NavigationContainer>
      {/* tabBar={(props) => <CustomTabBar {...props} />} */}
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
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
