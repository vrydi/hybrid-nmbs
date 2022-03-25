import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { fetchJson } from "./fetch";

const StationsContext = createContext();

export function StationProvider(props) {
  const [stationStringList, setStationStringList] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [selectedStationSearch, setSelectedStationSearch] = useState({});

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

  const setSelectedStationSearchFromString = async (station) => {
    if (station === "") return;
    const id = getStationIdFromString(station);
    console.log(id);
    const fetched = await fetchJson(
      "https://api.irail.be/liveboard/?lang=nl&format=json&id=" + id
    );
    console.log(fetched);
    setSelectedStationSearch(fetched);
  };

  const getStationIdFromString = (string) => {
    const filtered = stationsList.filter(
      (station) => station.standardname === string
    );
    if (filtered.length === 0) return null;
    return filtered[0].id;
  };

  const api = useMemo(
    () => ({
      stationsList,
      stationStringList,
      setSelectedStationSearchFromString,
      selectedStationSearch,
    }),
    [
      stationsList,
      stationStringList,
      setSelectedStationSearchFromString,
      selectedStationSearch,
    ]
  );

  return (
    <StationsContext.Provider value={api}>
      {props.children}
    </StationsContext.Provider>
  );
}

export const useStationsContext = () => useContext(StationsContext);
