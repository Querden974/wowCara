import ProgressBar from "./progressBar";

export default function PanelInfo({ name, server, data }) {
  const [ilvl, classe] = [
    data.informations.average_item_level,
    data.informations.character_class.name,
  ];

  const paramArray = [
    ["Nom", name],
    ["Serveur", server],
    ["Ilvl", ilvl],
    ["Classe", classe],
  ];

  return (
    <>
      <div className="relative lg:row-span-2">
        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
          <div id="characterInfo" className="px-8 pt-8 sm:px-10 sm:p-8 h-max">
            <div className="flow-root ">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {paramArray.map((param, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="font-medium text-gray-900 capitalize">
                      {param[0]}
                    </dt>
                    <dd
                      id="nomPersonnage"
                      className="text-gray-700 sm:col-span-2 capitalize"
                    >
                      {param[1]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
      </div>
    </>
  );
}
