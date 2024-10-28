function ProgressBar(){
    const colors = {
        "lfr": "bg-lfr",
        "normal": "bg-normal",
        "heroic": "bg-heroic",
        "mythic": "bg-mythic"
    }
    return(
        
        <div className="flex flex-col h-fit relative top-2">
           

            

            <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow="50" className="block rounded-full relative -top-2 bg-slate-200 z-0 ">
                <span id="normal" className="block h-2 rounded-full bg-normal text-center text-[10px]/4  z-0">
                
            </span>
            </span>
            

            <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow="50" className="block rounded-full relative -top-4 z-10">
                <span id="heroic" className="block h-2 rounded-full bg-heroic text-center text-[10px]/4  z-10">
                
            </span>
            </span>

            <span role="progressbar" aria-labelledby="ProgressLabel" aria-valuenow="50" className="block rounded-full  relative -top-6 z-20">
                <span id="mythic" className="block h-2 rounded-full bg-mythic text-center text-[10px]/4 z-20">
                
            </span>
            </span>

            <div className="flex flex-row gap-3 text-xs relative -top-4">
                <span className="text-lfr"> LFR  </span>
                <span className="text-normal">  Normal  </span>
                <span className="text-heroic">  Heroic  </span>
                <span className="text-mythic">  Mythic </span>
            </div>
        </div>
    )
}
export default ProgressBar