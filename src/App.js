import FormLink from "./Components/FormLink";
import { useState } from "react";
import Graph from "./Components/Graph";
import ParticlesBg from "./Components/ParticlesBg";
import LogoImg from "./Images/the.png"
import GitHubMenu from "./Components/GithubMenu";
import AboutUs from "./Components/AboutUs";

function App() {
  const [validFirstTitle, setValidFirstTitle] = useState("");
  const [validLastTitle, setValidLastTitle] = useState("");
  const [validBFS, setValidBFS] = useState(true);
  return (
    <div style={{ fontFamily: "Roboto Mono" }}>
      <img src={LogoImg} alt="logo-img" className="h-32 top-0 left-3 absolute"/>
      <div className="absolute right-8 text-center mt-5">
        <GitHubMenu/>
        <AboutUs/>
      </div>
      <div className="pt-8 flex flex-col items-center">
        <div className="w-3/4 text-center p-8">
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
      <div className="relative -z-10">
        <ParticlesBg/>
      </div>
    </div>
  );
}

export default App;
