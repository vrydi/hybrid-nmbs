import { View, Text, Image } from "react-native";
import { fullContainer, image, title } from "../data/styles";
import tw from "twrnc";

export function HomePage() {
  return (
    <View style={fullContainer}>
      <View style={tw`w-full max-h-60`}>
        <Image
          style={image}
          source={{
            uri: "https://pbs.twimg.com/media/Ea9cHfSWAAA6mQQ?format=jpg&name=medium",
          }}
        />
      </View>
      <Text style={title}>Waar naartoe?</Text>
    </View>
  );
}
