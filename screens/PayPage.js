import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Button, Card, Paragraph } from "react-native-paper";
import { fullContainer, image } from "../data/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function PayPage() {
  const {
    products,
    prices,
    selectedProductID,
    setSelectedProductID,
    buyProduct,
  } = useProductContext();
  const navigation = useNavigation();

  const onsubmit = () => {
    if (selectedProductID !== undefined) {
      buyProduct();
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () =>
      setSelectedProductID(undefined)
    );

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={fullContainer}>
      <View style={tw`w-full max-h-60`}>
        <Image
          style={image}
          source={{
            uri: "https://pbs.twimg.com/media/Ea9cHfSWAAA6mQQ?format=jpg&name=medium",
          }}
        />
      </View>

      <ScrollView>
        {products.map((item, i) => (
          <Pressable key={i} onPress={() => setSelectedProductID(item.id)}>
            <Card
              style={tw`w-8/9 m-3 mx-auto ${
                selectedProductID === item.id ? "bg-blue-400" : ""
              }`}
              elevation={6}
              mode={"elevated"}
            >
              <Card.Title title={item.name} />
              <Card.Content>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph style={tw`text-right`}>
                  {"\u20AC"}
                  {(
                    prices.filter((pr) => pr.product === item.id)[0]
                      .unit_amount / 100
                  ).toFixed(2)}
                </Paragraph>
              </Card.Content>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
      <Button
        labelStyle={tw`text-white`}
        style={tw`m-5 ${
          selectedProductID === undefined ? "bg-gray-400" : "bg-orange-500"
        }`}
        disabled={selectedProductID === undefined}
        onPress={() => onsubmit()}
      >
        Buy
      </Button>
    </SafeAreaView>
  );
}
