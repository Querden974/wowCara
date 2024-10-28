function Card(CSS="") {
    return (
        <>
        
        <div className="py-16">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

                <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                    Warcraft Caracters
                </p>
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 h-[600px]">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div id='characterInfo' className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10 h-[200px]">


                                <div className="flow-root ">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">Nom</dt>
                                            <dd id='nomPersonnage' className="text-gray-700 sm:col-span-2">
                                                

                                            </dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">Serveur</dt>
                                            <dd id='servPersonnage' className="text-gray-700 sm:col-span-2"></dd>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900">iLvl</dt>
                                            <dd id='ilvlPersonnage' className="text-gray-700 sm:col-span-2"></dd>
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
                            <div id='characterRender' className="relative px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10 h-[700px] -top-[150px]">

                                <p id="nameMain" className="flex relative text-4xl font-bold justify-center top-[100px] font-mono ">
                                    
                                </p>
                                <p id="guildMain" className="flex relative text-1xl font-bold justify-center top-[100px]  font-mono">
                                    
                                </p>
                                <div id="imageDiv" className="flex flex-col justify-center items-center">
                                    <img id="imageRender" className="flex relative object-cover w-[600px] h-[850px] -top-[60px] " 
                                    src="" 
                                    alt="imageRender" />
                                </div>
                            </div>

                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg overflow-clip  "></div>
                    </div>
                    


                    
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Powerful APIs
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow">
                                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                                            <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                                                NotificationSetting.jsx
                                            </div>
                                            <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                        </div>
                                    </div>
                                    <div className="px-6 pb-14 pt-6">{/* Your code example */}</div>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>
                </div>
            </div>
        </div>
        </>
      )
    }


export default Card