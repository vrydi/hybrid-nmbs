import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchJson } from "./fetch";

const DisturbanceContext = createContext();

export function DisturbanceProvider(props) {
  const [workDisturbances, setWorkDisturbances] = useState([]);
  const [defectDisturbances, setDefectDisturbances] = useState([]);

  useEffect(() => {
    fetchDisturbances();
  }, []);

  async function fetchDisturbances() {
    const raw = await fetchJson(
      "https://api.irail.be/disturbances/?lang=nl&format=json"
    );
    setDefectDisturbances(
      raw.disturbance.filter((dist) => dist.type === "disturbance")
    );
    setWorkDisturbances(
      raw.disturbance.filter((dist) => dist.type === "planned")
    );
  }

  const api = useMemo(
    () => ({ workDisturbances, defectDisturbances, fetchDisturbances }),
    [workDisturbances, defectDisturbances, fetchDisturbances]
  );

  return (
    <DisturbanceContext.Provider value={api}>
      {props.children}
    </DisturbanceContext.Provider>
  );
}

export const useDisturbanceContext = () => useContext(DisturbanceContext);
