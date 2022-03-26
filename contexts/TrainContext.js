import { createContext, useContext, useState } from "react";

const TrainContext = createContext();

export function TrainProvider(props) {
  const [trainData, setTrainData] = useState();
  const [activeTrainID, setActiveTrainID] = useState();

  const updateActiveTrainID = useCallback(
    (id) => {
      setSelectedStationID(id);
    },
    [selectedStationID]
  );
  useEffect(() => {
    console.log("use effect set station", selectedStationID);
    if (selectedStationID !== undefined) {
      updateSelectedStationData();
    }
  }, [selectedStationID]);

  const updateTrainData = async () => {
    console.log("fetching station", selectedStationID);
    const data = await fetchJson(
      "https://api.irail.be/liveboard/?lang=nl&format=json&id=" +
        selectedStationID
    );
    setSelectedStation(data);
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
