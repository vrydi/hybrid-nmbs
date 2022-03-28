import {
  View,
  Text,
  Image,
  Keyboard,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  button,
  buttonText,
  flexBox,
  fullContainer,
  image,
  inputDropdownListContainer,
  regular,
  title,
} from "../data/styles";
import tw from "twrnc";
import { useStationsContext } from "../contexts/StationContext";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import format from "date-fns/format";
import { useConnectionContext } from "../contexts/ConnectionContext";
import { useNavigation } from "@react-navigation/native";
import { PAGE_CONNECTION } from "../data/NavigationConstants";

export function HomePage() {
  const { stationStringList } = useStationsContext();
  const { findConnection } = useConnectionContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      departure: "",
      arrival: "",
      date: new Date(),
      time: new Date(),
      timePoint: "departure",
    },
  });
  const navigation = useNavigation();
  const onSubmit = (data) => {
    findConnection(data).then(() => navigation.push(PAGE_CONNECTION));
  };

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const items = stationStringList.map((station) => ({
    label: station.name,
    value: station.id,
  }));

  const [focusedField, setFocusField] = useState("");

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setFocusField("");
        }}
      >
        <View style={fullContainer}>
          {(focusedField === "" || focusedField === "timePoint") && (
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
                  searchPlaceholder="Zoek een station..."
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
                  searchPlaceholder="Zoek een station..."
                  placeholder="Selecteer een aankomststation"
                  zIndex={2000}
                  zIndexInverse={2000}
                  dropDownDirection={"BOTTOM"}
                />
              </>
            )}
            name="arrival"
          />
          <View style={flexBox}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <DropDownPicker
                    // style={inputDropdownListContainer}
                    containerStyle={tw`w-3/8`}
                    open={focusedField === "timePoint"}
                    value={value}
                    onClose={() => {
                      onBlur;
                      setFocusField("");
                    }}
                    setValue={onChange}
                    onChangeValue={onChange}
                    setOpen={() => setFocusField("timePoint")}
                    closeAfterSelecting={true}
                    items={[
                      { label: "Vertrek", value: "departure" },
                      { label: "Aankomst", value: "arrival" },
                    ]}
                    maxHeight={200}
                    placeholder="Selecteer een aankomststation"
                    zIndex={1000}
                    zIndexInverse={3000}
                    dropDownDirection={"BOTTOM"}
                  />
                </>
              )}
              name="timePoint"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TouchableOpacity
                  onPress={() => setOpenDatePicker(true)}
                  style={button}
                >
                  <Text style={buttonText}>{format(value, "dd-MM-yyyy")}</Text>
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
                </TouchableOpacity>
              )}
              name="date"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TouchableOpacity
                  onPress={() => setOpenTimePicker(true)}
                  style={button}
                >
                  <Text style={buttonText}>
                    {value.toLocaleTimeString().slice(0, 5)}
                  </Text>
                  {openTimePicker && (
                    <RNDateTimePicker
                      onChange={(res) => {
                        setOpenTimePicker(false);
                        onChange(new Date(res.nativeEvent.timestamp));
                      }}
                      value={value}
                      minimumDate={new Date()}
                      mode={"time"}
                      display={"spinner"}
                      is24Hour={true}
                    />
                  )}
                </TouchableOpacity>
              )}
              name="time"
            />
          </View>

          <View style={tw`w-1/2 mx-auto my-5`}>
            <TouchableOpacity
              title="submit"
              onPress={handleSubmit(onSubmit)}
              style={button}
            >
              <Text style={buttonText}>Vind me een trein</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
}
