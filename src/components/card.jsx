import ProgressBar from "./progressBar";
import DungeonCard from "./dungeonCard";
function Card() {
  return (
    <>
      <div className="py-16">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl z-10">
            Warcraft Caracters
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 h-[600px]">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div
                  id="characterInfo"
                  className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10 h-[200px]"
                >
                  <div className="flow-root ">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Nom</dt>
                        <dd
                          id="nomPersonnage"
                          className="text-gray-700 sm:col-span-2"
                        ></dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Serveur</dt>
                        <dd
                          id="servPersonnage"
                          className="text-gray-700 sm:col-span-2"
                        ></dd>
                      </div>

                      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">iLvl</dt>
                        <dd
                          id="ilvlPersonnage"
                          className="text-gray-700 sm:col-span-2"
                        ></dd>
                      </div>
                      <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Raid</dt>
                        <dd
                          id="raidProgression"
                          className="text-gray-700 sm:col-span-2"
                        >
                          <>
                            {" "}
                            <ProgressBar />
                          </>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-transparent lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col  rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div id="characterRender" className="relative   h-[700px] ">
                  <p
                    id="nameMain"
                    className="flex  text-4xl font-bold justify-center  font-mono "
                  ></p>
                  <p
                    id="guildMain"
                    className="flex  text-1xl font-bold justify-center   font-mono"
                  ></p>

                  <div
                    id="imageDiv"
                    className="flex justify-center items-center  h-[500px] "
                  >
                    <img
                      id="imageRender"
                      className="  object-cover w-[600px] h-[900px]  -top-10 z-0 hidden "
                      src=""
                      alt="imageRender"
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg overflow-clip  "></div>
            </div>

            <DungeonCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
