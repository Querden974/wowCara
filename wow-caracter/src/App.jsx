import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/card";
import SearchChar from "./components/searchChar";
import "./index.css";
import SelectMenu from "./components/selectMenu";

function App() {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState("eu");
  const [realm, setRealm] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <SelectMenu
        changeRegion={setRegion}
        changeRealm={setRealm}
        changeName={setName}
      />

      <Card />
    </>
  );
}

export default App;
