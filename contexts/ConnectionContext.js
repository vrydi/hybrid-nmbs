import { format } from "date-fns";
import { createContext, useContext, useMemo, useState } from "react";
import { fetchJson } from "./fetch";
import { useStationsContext } from "./StationContext";

const ConnectionContext = createContext();

export function ConnectionProvider(props) {
  const [connectionInfo, setConnectionInfo] = useState();

  const { stationsList } = useStationsContext();

  async function findConnection(data) {
    const details = {
      from: stationsList.filter((st) => st.id === data.departure)[0]
        .standardname,
      to: stationsList.filter((st) => st.id === data.arrival)[0].standardname,
      date: format(data.date, "ddMMyy"),
      time: format(data.date, "HHmm"),
      timesel: data.timePoint,
    };
    const raw = await fetchJson(
      `https://api.irail.be/connections/?lang=nl&format=json&from=${details.from}&to=${details.to}&date=${details.date}&time=${details.time}&timesel=${details.timesel}`
    );
    setConnectionInfo(raw.connection);
  }

  const api = useMemo(() => ({ findConnection }), [findConnection]);

  return (
    <ConnectionContext.Provider value={api}>
      {props.children}
    </ConnectionContext.Provider>
  );
}

export const useConnectionContext = () => useContext(ConnectionContext);
