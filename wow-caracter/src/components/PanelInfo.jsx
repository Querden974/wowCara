import ProgressBar from "./progressBar";

import { useState, useEffect } from "react";
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
  const mainStat = data.mainStat.primary_stat_type.type.toLowerCase();

  const maintStatValue = data.stats[mainStat].effective;

  const statsArray = [
    [mainStat, maintStatValue],
    ["Mastery", data.stats.mastery.value],
    ["Crit", data.stats.melee_crit.value],
    ["Haste", data.stats.melee_haste.value],
    [
      "Poly",
      {
        done: data.stats.versatility_damage_done_bonus,
        taken: data.stats.versatility_damage_taken_bonus,
        value: data.stats.versatility,
      },
    ],
  ];

  return (
    <>
      <div
        className={`relative lg:row-span-2 w-full h-[clamp(40rem,80vh,45rem)]`}
      >
        <div className="absolute inset-px rounded-lg bg-white sm:rounded-l-[2rem] w-full"></div>
        <div className="relative flex w-full h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] sm:rounded-l-[calc(2rem+1px)]">
          <div
            id="characterInfo"
            className="px-8 pt-8 lg:px-10 lg:p-8 h-max w-full"
          >
            <div className="flow-root ">
              <p className="text-center text-xl font-bold mb-4">Informations</p>
              <dl className="my-3 divide-y divide-gray-100 text-sm">
                {paramArray.map((param, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[20%,1fr] gap-1 py-3 sm:grid-cols-[20%,1fr] sm:gap-2 "
                  >
                    <dt className="font-medium text-gray-900 capitalize">
                      {param[0]}
                    </dt>
                    <dd
                      id="nomPersonnage"
                      className="text-gray-700  capitalize text-center"
                    >
                      {param[1]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div id="characterStats" className="px-8 pt-8 lg:px-10 lg:p-8 h-max">
            <div className="flow-root ">
              <p className="text-center text-xl font-bold mb-4">Stats</p>
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {statsArray.map((param, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[20%,1fr] gap-1 py-3 sm:grid-cols-[20%,1fr] sm:gap-2 "
                  >
                    <dt className="font-medium text-gray-900 capitalize">
                      {param[0]}
                    </dt>
                    <dd
                      id="nomPersonnage"
                      className="text-gray-700  capitalize text-center"
                    >
                      {param[0] == "Poly"
                        ? `${param[1].done.toFixed(
                            2
                          )}% / ${param[1].taken.toFixed(2)}%`
                        : param[0] == mainStat
                        ? `${param[1]}`
                        : `${param[1].toFixed(2)} %`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div id="characterTalents" className="flex w-full justify-center">
            <a
              href={`https://www.wowhead.com/talent-calc/blizzard/${data.raiderIO.talentLoadout.loadout_text}`}
              className="text-base font-semibold m-6 group relative w-max"
              target="_blank"
            >
              <span className="flex items-center gap-2 px-1 relative z-10 group-hover:text-white">
                View Talent Tree
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </span>
              <span className="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-primary z-0 group-hover:h-full  rounded-lg "></span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
