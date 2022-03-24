import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchJson } from "./fetch";

const StationsContext = createContext();

export function StationProvider(props) {
  const [stationStringList, setStationStringList] = useState([]);
  const [stationsList, setStationsList] = useState([]);

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
        newStringList.push(station.standardname);
      });
      setStationsList(newList);
      setStationStringList(newStringList);
    }
    loadStations();
  }, [setStationsList]);
  const api = useMemo(
    () => ({
      stationsList,
      stationStringList,
    }),
    [stationsList, stationStringList]
  );

  return (
    <StationsContext.Provider value={api}>
      {props.children}
    </StationsContext.Provider>
  );
}

export const useStationsContext = () => useContext(StationsContext);
