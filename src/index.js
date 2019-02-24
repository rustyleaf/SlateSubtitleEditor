import React from "react";
import ReactDOM from "react-dom";

import TestEditor from "./TestEditor";
import "./styles.css";

function App() {
  return <TestEditor timecode={() => "00:00:00:00"} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
