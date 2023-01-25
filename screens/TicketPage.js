import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  nmbsBlueLight,
  fullContainer,
  subTitle,
  title,
  bold,
  regular,
  button,
  buttonText,
  fullPageFlex,
} from "../data/styles";
import { useProductContext } from "../contexts/ProductContext";
import QRCode from "react-native-qrcode-svg";
import tw from "twrnc";
import { Button, Card, Divider, List, Modal, Portal } from "react-native-paper";
import Dash from "react-native-dash";
import format from "date-fns/format";
import { NAV_PAY } from "../data/NavigationConstants";
import { useNavigation } from "@react-navigation/native";

export default function TicketPage() {
  const { tickets, selectedProductID } = useProductContext();
  const navigation = useNavigation();

  const navigateToTicketPage = () => {
    navigation.navigate(NAV_PAY.name);
  };

  return (
    <SafeAreaView style={fullContainer}>
      <Text style={title}>TicketPage</Text>
      <FlatList
        data={tickets}
        renderItem={({ item }) => <TicketView ticket={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={fullPageFlex}>
            <Text style={subTitle}>Geen tickets gevonden</Text>
            <TouchableOpacity
              title="buy tickets"
              onPress={navigateToTicketPage}
              style={button}
            >
              <Text style={buttonText}>Koop een ticket</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function TicketView(props) {
  const { ticket } = props;
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowDimensions();
  const d = new Date(0);
  d.setUTCMilliseconds(ticket.created);
  return (
    <View style={tw`w-8/9 mx-auto bg-[${nmbsBlueLight}] rounded-xl mt-3`}>
      <Text style={subTitle}>{ticket.product.name}</Text>
      <Dash
        style={tw`w-8/9 m-3`}
        dashGap={10}
        dashThickness={10}
        dashLength={10}
        dashStyle={{ borderRadius: 100, overflow: "hidden" }}
      />
      <View style={tw`flex-row mx-5 flex-wrap justify-between`}>
        <Pressable style={tw`w-1/2`} onPress={() => setShowModal(true)}>
          <View style={tw`p-3 bg-white mb-5 rounded-xl items-center`}>
            <QRCode value={ticket.id} size={150} />
          </View>
        </Pressable>
        <View style={tw`w-5/11`}>
          <Text style={bold}>Gekocht op</Text>
          <Text style={regular}>{format(d, "dd/MM/yyyy HH:mm:ss")}</Text>
          <Text style={bold}>Ticket code</Text>
          <Text style={regular}>{ticket.created / 1000}</Text>
          <Text style={bold}>Beschrijving</Text>
          <Text style={regular}>{ticket.product.description}</Text>
        </View>
      </View>
      <Portal>
        <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
          <Pressable
            style={tw`mx-auto bg-white p-5 rounded-xl`}
            onPress={() => setShowModal(false)}
          >
            <QRCode value={ticket.id} size={width - 70} />
          </Pressable>
        </Modal>
      </Portal>
    </View>
  );
}
