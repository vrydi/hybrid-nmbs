import { HomePage } from "../screens/HomePage";
import { StationSearchPage } from "../screens/StationSearchPage";

export const NAV_HOME = {
  name: "Home",
  icon: "home",
  color: "white",
  component: HomePage,
};
export const NAV_STATION_SEARCH = {
  name: "Station",
  icon: "plagiarism",
  color: "white",
  component: StationSearchPage,
};

export const NAV_ELEMENTS = [NAV_HOME, NAV_STATION_SEARCH];
