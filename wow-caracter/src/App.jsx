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
import HamburgerMenu from "./components/HamburgerMenu";
import MobileBanner from "./components/MobileBanner";
function App() {
  const [count, setCount] = useState(0);
  const [region, setRegion] = useState("eu");
  const [realm, setRealm] = useState("Aegwynn");
  const [name, setName] = useState("");
  const [characterData, setCharacterData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [locale, setLocale] = useState("en_GB");
  const [isOpen, setIsOpen] = useState(true);
  //console.log(characterData);

  return (
    <>
      <div className="h-full w-full px-[calc(clamp(1rem,5vw,5rem))] flex flex-col justify-center items-center">
        <div
          className={`
            flex justify-center ease-in-out duration-200 relative py-6 z-50 sm:w-[calc(40%-1rem)] w-full flex-col
            ${
              Object.keys(characterData).length > 0
                ? "sm:translate-y-[-10dvh]" // Position quand les données sont présentes
                : "-translate-y-0 sm:translate-y-[calc(100%+3rem)]" // Position centrée
            }
            
          `}
        >
          <HamburgerMenu
            isOpen={isOpen}
            changeIsOpen={setIsOpen}
            data={characterData}
          />
          <SelectMenu
            changeRegion={setRegion}
            changeRealm={setRealm}
            changeName={setName}
            changeCharacterData={setCharacterData}
            changeAccessToken={setAccessToken}
            changeLocale={setLocale}
            locale={locale}
            isOpen={isOpen}
            changeIsOpen={setIsOpen}
          />
        </div>
        <div
          className={`grid sm:grid-cols-3 gap-4 w-full h-full justify-center content-start py-6 px-4 duration-200 ease-in-out ${
            Object.keys(characterData).length > 0
              ? `${isOpen ? "blur-sm brightness-50" : "blur-none"} visible`
              : `invisible`
          }
          `}
        >
          {Object.keys(characterData).length > 0 && (
            <>
              <MobileBanner name={name} data={characterData} />
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
