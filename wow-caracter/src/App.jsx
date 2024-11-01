import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/card";
import SearchChar from "./components/searchChar";
import "./index.css";
import SelectMenu from "./components/selectMenu";
import PanelInfo from "./components/PanelInfo";
import PanelDungeon from "./components/PanelDungeon";
import getCharacterInfo from "./functions/getCharacterInfo";
import getCharacterApp from "./functions/getCharacterApp";
import getAccessToken from "./functions/getAccessToken";
import getRaiderIO from "./functions/getRaiderIO";
import ProfileCard from "./components/ProfileCard";

function App() {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState("eu");
  const [realm, setRealm] = useState("Aegwynn");
  const [name, setName] = useState("");
  const [characterData, setCharacterData] = useState({});

  console.log(characterData);

  return (
    <>
      <SelectMenu
        changeRegion={setRegion}
        changeRealm={setRealm}
        changeName={setName}
        changeCharacterData={setCharacterData}
      />
      {Object.keys(characterData).length > 0 && (
        <>
          <PanelInfo name={name} server={realm} data={characterData} />
          <ProfileCard name={name} data={characterData} />
          <PanelDungeon data={characterData} />
        </>
      )}
    </>
  );
}

export default App;
