import { Heart, Play } from "lucide-react";
import { useState } from "react";

type TvProps = {
    id: string;
    original_name: string;
    poster_path: string;
    first_air_date: string;
};

type TvItem = {
    item: TvProps;
};

const TvCard = ({ item }: TvItem) => {
    const [isLiked, setIsLiked] = useState(false);

    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault(); 

        setIsLiked(!isLiked);
    }

    return (
        <a href={`/stream/watch/${item.id}`} className="relative text-white shrink-0 md:w-[12%] md:min-w-[175px] min-w-[135px] cursor-pointer">
            <div className="relative relative w-full aspect-[7/10] rounded-md overflow-hidden">
                <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={`${item.original_name} Cover Art`}/>
                
                <div className="item-overlay absolute inset-0 bg-black/20 z-99">
                    <div className="flex justify-end p-2">
                        <button className="w-8 h-8 bg-black/60 flex items-center justify-center rounded-full cursor-pointer" onClick={handleSubmit}>
                            <Heart size={18} className={`${isLiked? "stroke-[rgb(255,0,50)] fill-[rgb(255,0,50)] liked-anim" : "stroke-white fill-transparent"} transition-all duration-300`}/>
                        </button>
                    </div>
                    
                    <Play size={40} className="absolute top-1/2 left-1/2 -translate-1/2"/>
                </div>
            </div>

            <div className="py-2 px-1">
                <p className="text-white/100 text-[15px] font-[500]">{item.original_name}</p>
                <p className="text-white/60 text-[13px] ">{item.first_air_date.split("-")[0]}</p>
            </div>
        </a>
    )
}

export default TvCard;