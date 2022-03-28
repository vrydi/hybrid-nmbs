import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  NAV_ELEMENTS,
  PAGE_PAYMENT,
  PAGE_TRAIN_DETAIL,
} from "./data/NavigationConstants";
import { nmbsBlueDark } from "./data/styles";
import { StationProvider } from "./contexts/StationContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TrainDetailPage } from "./screens/TrainDetailPage";
import { TrainProvider, useTrainContext } from "./contexts/TrainContext";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ProductProvider } from "./contexts/ProductContext";
import CheckoutForm from "./screens/PaymentPage";
import { Provider as PaperProvider } from "react-native-paper";
import { DisturbanceProvider } from "./contexts/DisturbancesContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <ProductProvider>
        <StationProvider>
          <TrainProvider>
            <DisturbanceProvider>
              <ConnectionProvider>
                <PaperProvider>
                  <ProvidedApp />
                </PaperProvider>
              </ConnectionProvider>
            </DisturbanceProvider>
          </TrainProvider>
        </StationProvider>
      </ProductProvider>
    </StripeProvider>
  );
}

function ProvidedApp() {
  const { trainData } = useTrainContext();
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
        <Stack.Screen
          options={{
            title:
              trainData === undefined
                ? "Trein"
                : trainData.vehicleinfo.type +
                  "-" +
                  trainData.vehicleinfo.number,
          }}
          name={PAGE_TRAIN_DETAIL}
          component={TrainDetailPage}
        />
        <Stack.Screen name={PAGE_PAYMENT} component={CheckoutForm} />
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
