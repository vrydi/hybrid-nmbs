import { FlatList, View, Text } from "react-native";
import {
  flexBox,
  fullContainer,
  inputDropdownListContainer,
  title,
} from "../data/styles";
import tw from "twrnc";
import { useStationsContext } from "../contexts/StationContext";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { SafeAreaView } from "react-native-safe-area-context";

export function StationSearchPage() {
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
    if (data !== "") updateSelectedStationID(data);
  };
  return (
    <SafeAreaView style={fullContainer}>
      <View style={fullContainer}>
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
        <DepartureList />
      </View>
    </SafeAreaView>
  );
}

function DepartureList() {
  const {
    selectedStation,
    updateSelectedStationID,
    updateSelectedStationData,
  } = useStationsContext();

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("update");
      updateSelectedStationID(selectedStation.stationinfo.id);
      // updateSelectedStationData();
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

  const d = new Date(0);
  d.setSeconds(departure.time);
  return (
    <View style={flexBox}>
      <Text>{departure.station}</Text>
      <View style={tw`flex w-1/5 flex-row justify-between`}>
        <Text>{d.toLocaleTimeString().slice(0, 5)}</Text>
        <Text style={tw`text-red-500`}>
          {departure.delay > 0 ? `+${departure.delay / 60}` : ""}
        </Text>
      </View>
    </View>
  );
}
