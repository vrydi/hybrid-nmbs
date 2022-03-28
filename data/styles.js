import tw from "twrnc";

export const nmbsBlueLight = "#3684B8";
export const nmbsBlue = "#006ab3";
export const nmbsBlueDark = "#035C97";
export const fullContainer = tw`h-full bg-[${nmbsBlue}]`;
export const image = { width: "100%", height: "100%", resizeMode: "contain" };
export const title = tw`text-white text-4xl font-bold text-center mt-10`;
export const subTitle = tw`text-white text-2xl font-bold text-center mt-3`;
export const inputDropdownListContainer = tw`w-8/9 mx-auto my-2`;
export const flexBox = tw`flex flex-row items-center justify-between w-8/9 mx-auto`;
export const button = tw`px-5 text-white py-3 bg-[${nmbsBlueDark}] rounded-lg`;
export const buttonText = tw`text-white text-center`;
export const regular = tw`text-white`;
export const bold = tw`text-white font-bold text-[18px]`;
export const collapsibleButton = tw`bg-[${nmbsBlueDark}] w-full absolute z-1000 bottom-0`;
export const collapsibleButtonContent = tw`bg-[${nmbsBlue}]`;
export const collapsibleButtonTitle = tw`p-5 text-white`;
export const flexColumn = tw`flex flex-col`;
export const flushTitle = tw`text-white text-4xl font-bold text-center`;
export const inputContainer = {
  height: 50,
  marginHorizontal: 20,
  marginTop: 40,
};
export const input = tw`bg-gray-300 rounded-xl h-full px-3`;
export const error = tw`text-center text-red-400`;
export const dottedLine = {
  borderStyle: "dotted",
  borderWidth: 1,
  borderRadius: 1,
};
