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
    async function loadStations() {
      const temp = await fetchJson(
        "https://api.irail.be/stations?lang=nl&format=json"
      );
      setStationsList(
        temp.station
          .filter((station) => !forbiddenStations.includes(station.id))
          .sort((a, b) => a.standardname.localeCompare(b.standardname))
      );
      setStationStringList(
        temp.station
          .filter((station) => {
            if (!forbiddenStations.includes(station.id))
              return { name: station.name, id: station.id };
          })
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    loadStations();
  }, [setStationsList]);

  const updateSelectedStationID = useCallback(
    (id) => {
      setSelectedStationID(id);
    },
    [selectedStationID]
  );
  useEffect(() => {
    if (selectedStationID !== undefined) {
      updateSelectedStationData();
    }
  }, [selectedStationID]);

  const updateSelectedStationData = async () => {
    console.log("fetching station", selectedStationID);
    const data = await fetchJson(
      "https://api.irail.be/liveboard/?lang=nl&format=json&id=" +
        selectedStationID
    );
    setSelectedStation(data);
  };

  const api = useMemo(
    () => ({
      stationsList,
      stationStringList,
      updateSelectedStationID,
      selectedStation,
      updateSelectedStationData,
      selectedStationID,
    }),
    [
      stationsList,
      stationStringList,
      updateSelectedStationID,
      selectedStation,
      updateSelectedStationData,
      selectedStationID,
    ]
  );

  return (
    <StationsContext.Provider value={api}>
      {props.children}
    </StationsContext.Provider>
  );
}

export const useStationsContext = () => useContext(StationsContext);
