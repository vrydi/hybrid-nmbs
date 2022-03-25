import { FlatList, View, Text } from "react-native";
import { fullContainer, inputDropdownListContainer } from "../data/styles";
import tw from "twrnc";
import { useStationsContext } from "../contexts/StationContext";
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
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
  const { selectedStation } = useStationsContext();
  //   console.log("station", selectedStation);
  if (selectedStation) {
    // console.log("departures", selectedStation.departures);
    selectedStation.departures.departure.map((departure) =>
      console.log("departure", departure)
    );
  }
  return (
    <View>
      {selectedStation && (
        <FlatList
          data={selectedStation.departures.departure}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DepartureListElement departure={item} />}
        />
      )}
    </View>
  );
}

function DepartureListElement(props) {
  const { departure } = props;
  console.log("departureEl", departure);
  return (
    <View>
      <Text>{departure.station}</Text>
    </View>
  );
}
