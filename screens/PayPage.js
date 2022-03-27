import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import Constants from "expo-constants";
import { useProductContext } from "../contexts/ProductContext";
const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

export default function PayPage() {
  const { products } = useProductContext();
  console.log("products", products);

  return (
    <View>
      <Text>PayPage</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>a</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
