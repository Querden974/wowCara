import { useState, useEffect } from "react"
import listDungeon from "../functions/getDungeons"
import getAccessToken from "../functions/getAccessToken"

function DungeonCard(){
    const [dungeons, setDungeons] = useState([])

    async function initDungeons(){
        const accessToken = await getAccessToken('eu');
        const dungeons = await listDungeon(accessToken,'eu');
        setDungeons(dungeons);
        console.log(dungeons)
        
    }
    useEffect(() => {
        initDungeons();
        
    }, []);
    return(
        <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div id="dungeonPanel"	 className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className='flex flex-col p-8 gap-4 '>
                                {dungeons.map((dungeons, index)=> (
                                    <div key={dungeons.shortName} className="flex flex-row gap-2">
                                        
                                        <img id={dungeons.shortName+"-img"} src={dungeons.img}
                                        className="w-[16%] aspect-square rounded-lg"
                                        />
                                        <p id={dungeons.shortName+"-difficulty"} className="text-4xl font-mono capitalize align relative right-11 top-1 text-slate-100">1</p>
                                        
                                        <div className="flex flex-col gap-2 w-full">
                                            <p className="text-sm font-mono capitalize align font-semibold ">{dungeons.name.replace(/-/g, ' ')}</p>
                                            <div className="grid grid-cols-3 items-center ">
                                                <p id={dungeons.shortName+"-score"} className="text-sm font-mono capitalize align">???</p>
                                                <p id={dungeons.shortName+"-timer"} className="text-sm font-mono capitalize align">???</p>
                                                <p id={dungeons.shortName+"-upgrade"} className="text-sm font-mono capitalize align">???</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>
    )
}

export default DungeonCard
