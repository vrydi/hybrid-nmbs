import DisturbancePage from "../screens/DisturbancePage";
import { HomePage } from "../screens/HomePage";
import PayPage from "../screens/PayPage";
import { StationSearchPage } from "../screens/StationSearchPage";
import TicketPage from "../screens/TicketPage";

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

export const NAV_TICKETS = {
  name: "Tickets",
  icon: "bookmark",
  color: "white",
  component: TicketPage,
};

export const NAV_PAY = {
  name: "Koop",
  icon: "payment",
  color: "white",
  component: PayPage,
};
export const NAV_DISTURBANCES = {
  name: "Storing",
  icon: "construction",
  color: "white",
  component: DisturbancePage,
};

export const NAV_ELEMENTS = [
  NAV_HOME,
  NAV_STATION_SEARCH,
  NAV_PAY,
  NAV_TICKETS,
  NAV_DISTURBANCES,
];

export const PAGE_TRAIN_DETAIL = "Trein";
export const PAGE_PAYMENT = "Pay";
export const PAGE_CONNECTION = "Verbindingen";
