import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchJson } from "./fetch";

const StationsContext = createContext();

export function StationProvider(props) {
  const [stationStringList, setStationStringList] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [selectedStationID, setSelectedStationID] = useState("");

  useEffect(() => {
    console.log("useEffect");
    async function loadStations() {
      const temp = await fetchJson(
        "https://api.irail.be/stations?lang=nl&format=json"
      );
      const newList = [];
      const newStringList = [];
      temp.station.forEach((station) => {
        newList.push(station);
        newStringList.push({
          name: station.name,
          id: station.id,
        });
      });
      setStationsList(newList);
      setStationStringList(newStringList);
    }
    loadStations();
  }, [setStationsList]);

  const updateSelectedStationID = (id) => setSelectedStationID(id);

  const selectedStation = useMemo(async () => {
    await fetchJson(
      "https://api.irail.be/liveboard/?format=json&id=" + selectedStationID
    );
  }, [selectedStationID]);

  const api = useMemo(
    () => ({
      stationsList,
      stationStringList,
      updateSelectedStationID,
    }),
    [stationsList, stationStringList, updateSelectedStationID]
  );

  return (
    <StationsContext.Provider value={api}>
      {props.children}
    </StationsContext.Provider>
  );
}

export const useStationsContext = () => useContext(StationsContext);
