import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  Pressable,
} from "react-native";
import {
  fullContainer,
  image,
  input,
  inputContainer,
  inputDropdownList,
  inputDropdownListContainer,
  inputLabel,
  title,
  TouchableWithoutFeedback,
} from "../data/styles";
import tw from "twrnc";
import { useStationsContext } from "../contexts/StationContext";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export function HomePage() {
  const { stationStringList } = useStationsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const items = stationStringList.map((station) => ({
    label: station,
    value: station,
  }));

  const [focusedField, setFocusField] = useState("");

  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
        setFocusField("");
      }}
    >
      <View style={fullContainer}>
        {focusedField === "" && (
          <View style={tw`w-full max-h-60`}>
            <Image
              style={image}
              source={{
                uri: "https://pbs.twimg.com/media/Ea9cHfSWAAA6mQQ?format=jpg&name=medium",
              }}
            />
          </View>
        )}
        <Text style={title}>Waar naartoe?</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <DropDownPicker
                containerStyle={inputDropdownListContainer}
                open={focusedField === "departure"}
                value={value}
                onClose={() => {
                  onBlur;
                  setFocusField("");
                }}
                searchable={true}
                setValue={onChange}
                setOpen={() => setFocusField("departure")}
                closeAfterSelecting={true}
                items={items}
                maxHeight={400}
                searchPlaceholder="Zoek en station..."
                placeholder="Selecteer een vertrekstation"
                zIndex={3000}
                zIndexInverse={1000}
                dropDownDirection={"BOTTOM"}
              />
            </>
          )}
          name="departure"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <DropDownPicker
                // style={inputDropdownListContainer}
                containerStyle={inputDropdownListContainer}
                open={focusedField === "arrival"}
                value={value}
                onClose={() => {
                  onBlur;
                  setFocusField("");
                }}
                searchable={true}
                setValue={onChange}
                setOpen={() => setFocusField("arrival")}
                closeAfterSelecting={true}
                items={items}
                maxHeight={400}
                searchPlaceholder="Zoek en station..."
                placeholder="Selecteer een aankomststation"
                zIndex={2000}
                zIndexInverse={2000}
                dropDownDirection={"BOTTOM"}
              />
            </>
          )}
          name="arrival"
        />
      </View>
    </Pressable>
  );
}
