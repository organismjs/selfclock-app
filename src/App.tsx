import { useState } from "react";

function App() {
  const [data, setData] = useState({
    title: "",
    id: 0,
    bounds: {
      x: 0,
      y: 0,
      height: 900,
      width: 1440,
    },
    owner: {
      name: "",
      processId: 0,
      bundleId: "",
      path: "",
    },
    url: "",
    memoryUsage: 0,
  });
  const [allApp, setAllApp] = useState([
    {
      title: "",
      id: 0,
      bounds: {
        x: 0,
        y: 0,
        height: 900,
        width: 1440,
      },
      owner: {
        name: "",
        processId: 0,
        bundleId: "",
        path: "",
      },
      url: "",
      memoryUsage: 0,
    },
  ]);
  const [network, setNetwork] = useState({})
  const [osInfo, setOsInfo] = useState({})
  window.ipcRenderer.on("active-window-data", (_event, message) => {
    setData(message);
  });
  window.ipcRenderer.on("active-window-data-all", (_event, message) => {
    setAllApp(message);
  });
  window.ipcRenderer.on("network", (_event, message) => {
    setNetwork(message);
  });
  window.ipcRenderer.on("os", (_event, message) => {
    setOsInfo(message);
  });
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid black" }}>
        <span>Focused Application Details</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span>Application Name: {data.owner.name}</span>
          <span>Title: {data.title}</span>
          <span>Memory: {data.memoryUsage}</span>
          {data.url && <span>URL: {data.url}</span>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span>All Active Application Details</span>
        {allApp.map((item: any) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border: "1px solid black",
            }}
          >
            <span>Application Name: {item.owner.name}</span>
            <span>Title: {item.title}</span>
            <span>Memory: {item.memoryUsage}</span>
            {item.url && <span>URL: {item.url}</span>}
          </div>
        ))}
      </div>
      -------------------------------
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid black" }}>
        <span>Raw network information</span>
        {JSON.stringify(network)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", border: "1px solid black" }}>
        <span>OS information</span>
        {JSON.stringify(osInfo)}
      </div>
    </div>
  );
}

export default App;
