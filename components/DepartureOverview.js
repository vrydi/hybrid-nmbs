import { View, Text } from "react-native";
import { bold, flexBox, regular } from "../data/styles";
import tw from "twrnc";

export function StopOverview(props) {
  const { departure } = props;

  const d = new Date(0);
  d.setSeconds(departure.time);
  return (
    <>
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
    </>
  );
}
