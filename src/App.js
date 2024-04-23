import Header from "./Components/Header";
import FormLink from "./Components/FormLink";
import { useState } from "react";

function App() {
  const [validFirstTitle, setValidFirstTitle] = useState("");
  const [validLastTitle, setValidLastTitle] = useState("");

  return (
    <div style={{ fontFamily: "Roboto Mono" }}>
      <Header />
      <div className="py-20 mt-16 bg-gray-100 bg-opacity-70 flex flex-col items-center">
        <div className="bg-gray-200 w-110 text-center p-8 rounded-2xl">
          <h1 className="text-5xl">WikiRace</h1>
          <br></br>
          <h2 className="text-2xl mb-20 mt-3">
            Find the Shortest Path from One Link to Another
          </h2>
          {validFirstTitle === "" || validLastTitle === "" ? (
            <FormLink
              setValidFirst={setValidFirstTitle}
              setValidLast={setValidLastTitle}
            />
          ) : (
            <h1>kontol</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
