import { View, Text } from "react-native";
import React, { useEffect } from "react";

import Constants from "expo-constants";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

export default function PayPage() {
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("fetching products");
      const data = await (await fetch(`${uri}/get-products`)).json();
      console.log(data);
    };
    fetchProducts();
  }, []);

  return (
    <View>
      <Text>PayPage</Text>
    </View>
  );
}
