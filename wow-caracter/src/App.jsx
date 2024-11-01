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
  const [accessToken, setAccessToken] = useState("");
  const [locale, setLocale] = useState("en_GB");
  //console.log(characterData);

  return (
    <>
      <div className="h-full w-full px-64 ">
        <div
          className={`
            flex justify-center ease-in-out duration-200 relative p-12 z-50
            ${
              Object.keys(characterData).length > 0
                ? "-translate-y-0" // Position quand les données sont présentes
                : "translate-y-[40dvh]" // Position centrée
            }
          `}
        >
          <SelectMenu
            changeRegion={setRegion}
            changeRealm={setRealm}
            changeName={setName}
            changeCharacterData={setCharacterData}
            changeAccessToken={setAccessToken}
            changeLocale={setLocale}
            locale={locale}
          />
        </div>
        <div
          className={`grid grid-cols-3 gap-4 w-full h-full justify-center content-center ${
            Object.keys(characterData).length > 0 ? "visible" : "invisible"
          }`}
        >
          {Object.keys(characterData).length > 0 && (
            <>
              <PanelInfo name={name} server={realm} data={characterData} />

              <ProfileCard name={name} data={characterData} />
              <PanelDungeon data={characterData} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
