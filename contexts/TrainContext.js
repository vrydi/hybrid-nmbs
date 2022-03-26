import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { fetchJson } from "./fetch";

const TrainContext = createContext();

export function TrainProvider(props) {
  const [trainData, setTrainData] = useState();
  const [activeTrainID, setActiveTrainID] = useState();

  const updateActiveTrainID = useCallback(
    (id) => {
      setActiveTrainID(id);
    },
    [activeTrainID]
  );
  useEffect(() => {
    console.log("use effect set train", activeTrainID);
    if (activeTrainID !== undefined) {
      updateTrainData();
    }
  }, [activeTrainID]);

  const updateTrainData = async () => {
    console.log("fetching train", activeTrainID);
    const data = await fetchJson(
      "https://api.irail.be/vehicle/?lang=nl&format=json&id=" + activeTrainID
    );
    setTrainData(data);
  };

  const api = useMemo(
    () => ({ trainData, activeTrainID, updateActiveTrainID, updateTrainData }),
    [trainData, activeTrainID, updateActiveTrainID, updateTrainData]
  );

  return (
    <TrainContext.Provider value={api}>{props.children}</TrainContext.Provider>
  );
}

export const useTrainContext = () => useContext(TrainContext);
