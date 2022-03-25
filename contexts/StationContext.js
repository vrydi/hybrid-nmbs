import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { forbiddenStations } from "../data/data";
import { fetchJson } from "./fetch";

const StationsContext = createContext();

export function StationProvider(props) {
  const [stationStringList, setStationStringList] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [selectedStationID, setSelectedStationID] = useState();
  const [selectedStation, setSelectedStation] = useState();

  useEffect(() => {
    console.log("useEffect");
    async function loadStations() {
      const temp = await fetchJson(
        "https://api.irail.be/stations?lang=nl&format=json"
      );
      const newList = [];
      const newStringList = [];
      const errorList = [];
      temp.station.forEach((station) => {
        if (!forbiddenStations.includes(station.id)) {
          newList.push(station);
          newStringList.push({
            name: station.name,
            id: station.id,
          });
        }
      });
      setStationsList(newList);
      setStationStringList(newStringList);
    }
    loadStations();
  }, [setStationsList]);

  const updateSelectedStationID = (id) => setSelectedStationID(id);

  useEffect(() => {
    const dataFetch = async () => {
      console.log("fetching station");
      const data = await fetchJson(
        "https://api.irail.be/liveboard/?format=json&id=" + selectedStationID
      );
      setSelectedStation(data);
    };
    console.log("use effect set station", selectedStationID);
    if (selectedStationID !== undefined) {
      dataFetch();
    }
  }, [selectedStationID]);

  const api = useMemo(
    () => ({
      stationsList,
      stationStringList,
      updateSelectedStationID,
      selectedStation,
    }),
    [stationsList, stationStringList, updateSelectedStationID, selectedStation]
  );

  return (
    <StationsContext.Provider value={api}>
      {props.children}
    </StationsContext.Provider>
  );
}

export const useStationsContext = () => useContext(StationsContext);
