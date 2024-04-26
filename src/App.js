import Header from "./Components/Header";
import FormLink from "./Components/FormLink";
import { useState } from "react";
import Graph from "./Components/Graph";

function App() {
  const [validFirstTitle, setValidFirstTitle] = useState("");
  const [validLastTitle, setValidLastTitle] = useState("");
  const [validBFS, setValidBFS] = useState(true);
  return (
    <div style={{ fontFamily: "Roboto Mono" }}>
      <Header />
      <div className="pb-10 mt-5 flex flex-col items-center">
        <div className="shadow-2xl bg-gray-200 bg-opacity-80 w-3/4 text-center p-8 rounded-2xl">
          <h1 className="text-5xl font-bold">WikiRace</h1>
          <br></br>
          <h2 className="text-2xl mb-20 mt-3 italic font-semibold">
            Find the Shortest Path from One Link to Another
          </h2>
          <FormLink
            setValidFirst={setValidFirstTitle}
            setValidLast={setValidLastTitle}
            setValidBFS={setValidBFS}
          /> 
            <Graph
              firstTitle={validFirstTitle}
              lastTitle={validLastTitle}
              isBFS={validBFS}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
