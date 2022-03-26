import { FlatList, View, Text, Pressable } from "react-native";
import {
  bold,
  flexBox,
  fullContainer,
  inputDropdownListContainer,
  regular,
  title,
  nmbsBlueLight,
} from "../data/styles";
import tw from "twrnc";
import { useStationsContext } from "../contexts/StationContext";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useCallback } from "react";
import format from "date-fns/format";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-web";
import { PAGE_TRAIN_DETAIL } from "../data/NavigationConstants";

export function StationSearchPage() {
  return (
    <SafeAreaView style={fullContainer}>
      <DepartureSelectDropdown />
      <DepartureList />
    </SafeAreaView>
  );
}

function DepartureSelectDropdown() {
  const { stationStringList, updateSelectedStationID } = useStationsContext();
  const [open, setOpen] = useState(false);
  const items = stationStringList.map((station) => ({
    label: station.name,
    value: station.id,
  }));
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      station: "",
    },
  });
  const onSubmit = (data) => {
    console.log("submit", data);
    if (data === "") {
      console.log("empty data");
    }
    if (data === undefined) {
      console.log("undefined data");
    }
    if (data !== "") updateSelectedStationID(data);
  };
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <DropDownPicker
            containerStyle={inputDropdownListContainer}
            open={open}
            value={value}
            onClose={() => {
              onBlur;
              setOpen(false);
            }}
            searchable={true}
            setValue={onChange}
            onChangeValue={(value) => handleSubmit(onSubmit(value))}
            setOpen={() => setOpen(true)}
            closeAfterSelecting={true}
            items={items}
            maxHeight={400}
            searchPlaceholder="Zoek en station..."
            placeholder="Selecteer een station"
            zIndex={2000}
            zIndexInverse={2000}
            dropDownDirection={"BOTTOM"}
          />
        </>
      )}
      name="station"
    />
  );
}

function DepartureList() {
  const { selectedStation, selectedStationID, updateSelectedStationData } =
    useStationsContext();

  useFocusEffect(() => {
    const timer = setInterval(() => {
      console.log("update");
      if (selectedStationID !== undefined) updateSelectedStationData();
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <View>
      {selectedStation && (
        <>
          <Text style={title}>{selectedStation.station}</Text>
          <FlatList
            data={selectedStation.departures.departure}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DepartureListElement departure={item} />}
          />
        </>
      )}
    </View>
  );
}

function DepartureListElement(props) {
  const { departure } = props;
  const navigation = useNavigation();

  const d = new Date(0);
  d.setSeconds(departure.time);
  return (
    <Pressable
      // android_ripple={true}
      style={({ pressed }) =>
        pressed
          ? tw`bg-[${nmbsBlueLight}] border-b border-[${nmbsBlueLight}] py-3`
          : tw`border-b border-[${nmbsBlueLight}] py-3`
      }
      onPress={() =>
        navigation.push(PAGE_TRAIN_DETAIL, { trainID: departure.vehicle })
      }
    >
      <View style={flexBox}>
        <Text style={bold}>{departure.station}</Text>
        <View style={tw`flex w-1/5 flex-row justify-between`}>
          <Text style={regular}>{d.toLocaleTimeString().slice(0, 5)}</Text>
          <Text style={tw`text-red-400 font-bold`}>
            {departure.delay > 0 ? `+${departure.delay / 60}` : ""}
          </Text>
        </View>
      </View>
      <View style={flexBox}>
        <Text style={regular}>Perron: {departure.platform}</Text>
        <Text style={regular}>
          {departure.vehicleinfo.type}-{departure.vehicleinfo.number}
        </Text>
      </View>
    </Pressable>
  );
}
