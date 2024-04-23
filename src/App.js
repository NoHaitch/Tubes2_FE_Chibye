import Header from "./Components/Header";
import FormLink from "./Components/FormLink";
import { useState } from "react";

function App() {
  const [validFirstTitle,setValidFirstTitle] = useState("");
  const [validLastTitle,setValidLastTitle] = useState("");

  return (
    <div>
      <Header />

      <h1 className="text-center text-5xl">
        WikiRace
      </h1>

      <h2 className="text-center text-2xl">
        Find the Shortest Path from One Link to Another
      </h2>
      {validFirstTitle==="" ? 
        <FormLink 
          setValidFirst={setValidFirstTitle}
          setValidLast={setValidLastTitle}
          />
        :(
        <h1>kontol</h1>
        )}
    </div>
  );
}

export default App;
