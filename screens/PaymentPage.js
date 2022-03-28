import { useProductContext } from "../contexts/ProductContext";
import tw from "twrnc";
import {
  buttonText,
  cardInput,
  collapsibleButton,
  error,
  fullContainer,
  input,
  inputContainer,
} from "../data/styles";

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Snackbar } from "react-native-paper";
import { NAV_TICKETS } from "../data/NavigationConstants";

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export default function CheckoutForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      card: "",
    },
  });
  const { paymentProgress, processPayment, setPaymentProgress } =
    useProductContext();
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    console.log("submitting");
    if (!data.card.complete) {
      return;
    }
    processPayment(data);
  };

  function dismiss() {
    if (paymentProgress.status === "success") {
      navigation.navigate(NAV_TICKETS.name);
      setPaymentProgress({ status: "", message: "" });
    }
  }

  return (
    <View style={fullContainer}>
      <ScrollView>
        <View style={inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="email-address"
                  placeholder="email"
                  autoComplete="email"
                />
                {errors.email && <Text style={error}>Email required</Text>}
              </>
            )}
            name="email"
            rules={{ required: true, pattern: emailRegex }}
          />
        </View>

        <View style={inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="default"
                  placeholder="Voornaam"
                  autoComplete="name"
                />
                {errors.firstName && <Text style={error}> *Verplicht</Text>}
              </>
            )}
            name="firstName"
            rules={{ required: true }}
          />
        </View>

        <View style={inputContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="default"
                  placeholder="Achternaam"
                  autoComplete="name-family"
                />
                {errors.lastName && <Text style={error}>*Verplicht</Text>}
              </>
            )}
            name="lastName"
            rules={{ required: true }}
          />
        </View>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <CardField
                postalCodeEnabled={true}
                placeholder={{ number: "4242 4242 4242 4242" }}
                cardStyle={input}
                style={inputContainer}
                value={value}
                onCardChange={(cardDetails) => onChange(cardDetails)}
              />
              {errors.card && <Text style={error}>Card required</Text>}
            </>
          )}
          name="card"
          rules={{ required: true }}
        />
      </ScrollView>

      {paymentProgress.status === "started" ? (
        <TouchableOpacity
          style={tw`rounded-xl w-3/4 py-5 z-1000 bottom-0 m-5 py-4 mx-auto bg-gray-400`}
          disabled={true}
          onPress={handleSubmit(onSubmit)}
        >
          <ActivityIndicator animating={true} size={"large"} color={"orange"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={tw`rounded-xl w-3/4 py-5 z-1000 bottom-0 m-5 py-4 mx-auto bg-orange-500
        `}
          disabled={false}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={buttonText}>Vervolledig betaling</Text>
        </TouchableOpacity>
      )}
      <Snackbar
        visible={
          paymentProgress.status !== "" && paymentProgress.status !== "started"
        }
        duration={3500}
        onDismiss={() => dismiss()}
      >
        {paymentProgress.message}
      </Snackbar>
    </View>
  );
}
