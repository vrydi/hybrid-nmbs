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
  const [trainComposition, setTrainComposition] = useState();

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
      getTrainComposition();
    }
  }, [activeTrainID]);

  const updateTrainData = async () => {
    console.log("fetching train", activeTrainID);
    const data = await fetchJson(
      "https://api.irail.be/vehicle/?lang=nl&format=json&id=" + activeTrainID
    );
    setTrainData(data);
  };

  const getTrainComposition = async () => {
    console.log("fetching train composition", activeTrainID.split(".")[2]);
    const data = await fetchJson(
      "https://api.irail.be/composition/?lang=nl&format=json&id=" +
        activeTrainID.split(".")[2]
    );
    if (data === undefined || data.error) return;
    setTrainComposition(data.composition.segments.segment);
  };

  const clearComposition = useCallback(() => {
    setTrainComposition(undefined);
    setTrainData(undefined);
  }, [setTrainData, setTrainComposition]);

  const api = useMemo(
    () => ({
      trainData,
      activeTrainID,
      updateActiveTrainID,
      updateTrainData,
      trainComposition,
      clearComposition,
    }),
    [
      trainData,
      activeTrainID,
      updateActiveTrainID,
      updateTrainData,
      trainComposition,
      clearComposition,
    ]
  );

  return (
    <TrainContext.Provider value={api}>{props.children}</TrainContext.Provider>
  );
}

export const useTrainContext = () => useContext(TrainContext);
