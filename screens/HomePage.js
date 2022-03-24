import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Keyboard,
  Pressable,
  TouchableOpacity,
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
import { Button } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import format from "date-fns/format";

export function HomePage() {
  const { stationStringList } = useStationsContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departure: "",
      arrival: "",
      date: new Date(),
    },
  });
  const onSubmit = (data) => console.log(data);

  const [openDatePicker, setOpenDatePicker] = useState(false);
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
                onChangeValue={onChange}
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
                onChangeValue={onChange}
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Button onPress={() => setOpenDatePicker(true)}>
              <Text>Date: {format(value, "dd-MM-yyyy")}</Text>
              {openDatePicker && (
                <RNDateTimePicker
                  onChange={(res) => {
                    setOpenDatePicker(false);
                    onChange(new Date(res.nativeEvent.timestamp));
                  }}
                  value={value}
                  minimumDate={new Date()}
                  mode={"date"}
                />
              )}
            </Button>
          )}
          name="date"
        />

        <TouchableOpacity title="submit" onPress={handleSubmit(onSubmit)}>
          <Text>Vind me een trein</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}
