
type EpisodesProp = {
    season: number;
    episodes: number
}


const Episodes = ( { episodes } : EpisodesProp) => {
    
    return (
        <div className="py-8 text-white">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-x-2 gap-y-4">
                {Array.from({ length: episodes }, (_, key) => (
                    <div key={key} className="bg-[rgba(100,100,100,0.1)] relative gap-2 px-4 py-2 rounded-lg cursor-pointer overflow-hidden">
                        <p className="md:text-lg">{key+1}. Episode {key+1}</p>

                        <div className="absolute w-full h-[2px] bg-[rgba(100,100,100,0.1)] left-0 bottom-0">
                            <div className={`absolute h-full w-[${key * 10}%] bg-white left-0 top-0`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Episodes;