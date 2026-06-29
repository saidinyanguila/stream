import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play, Plus, Check } from "lucide-react";
import { GetTvShow } from "../services/API";
import useEmblaCarousel from "embla-carousel-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Episodes from "../components/Episodes";
import Section from "../components/Section";

let item = {
    "id" : 0,
    "name" : "",
    "backdrop_path" : "",
    "overview" : "Description - Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias, voluptatum dolorem rem commodi nemo adipisci, perferendis, impedit odit cumque voluptatibus modi distinctio saepe et velit eum necessitatibus? Inventore quaerat dolorum eaque laboriosam eligendi repudiandae.",
    "genres" : [{"name" : ""}],
    "cast" : [],
    "first_air_date" : "",
    "seasons" : [
        {"season_number": 0, "name" : "", "episode_count" : 1, "overview" : "", "poster_path" : ""},
        {"season_number": 0, "name" : "", "episode_count" : 1, "overview" : "", "poster_path" : ""}
    ],
}

const WatchTv = () => {
    const { id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [selectedPart, setSelectedPart] = useState(0);

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
    });

    useEffect(() => {
        const loadItem = async () => {
            try {
                const item_id = id?.trim() ?? "";
                const item_res = await GetTvShow(item_id);

                item = (item_res);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load search...");
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        loadItem();
    }, []);

    return (
        <div className="relative bg-[rgb(15,15,15)]">
            <div className={`absolute inset-0 bg-black z-9999 ${!loading && "hidden"}`}></div>

            <Nav title="Watch" />
            
            <div className="max-w-[1440px] mx-auto">
                <section className="relative">
                    <div className="relative md:h-[550px] overflow-hidden">
                        <img className="h-full w-full object-center object-cover" src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`} alt="" />
                        <div className="absolute inset-0 z-98 watch-banner-filter"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 z-99"><Play size={58} className="fill-white stroke-white cursor-pointer"/></div>
                    </div>
        
                    <div className="md:bg-[rgb(0,0,0)] px-4 py-4 md:px-[8%] md:py-10 z-99">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-2 justify-between items-start mb-10">
                            {/* Actions */}
                            <div className="md:w-1/2 w-full">
                                <p className="text-3xl text-white font-[500] mb-4">{item.name}</p>
        
                                <div className="md:w-3/4 w-full flex gap-2">
                                    <a href={`#${id}`} className="grow-1 flex items-center justify-center gap-4 bg-white text-lg text-center py-3 font-bold rounded-md">
                                        <Play fill="[black]"/> Play
                                    </a>
        
                                    <button className="relative block bg-white text-lg text-center px-7 py-3 aspect-square shrink-0 font-bold rounded-md cursor-pointer" onClick={() => setIsSaved(!isSaved)}>
                                        <Plus size={28} strokeWidth={3} className={`absolute inset-0 left-1/2 top-1/2 -translate-1/2 transition-all duration-350 ${isSaved? "scale-0" : "scale-100"}`}/>
                                        <Check size={28} strokeWidth={3} className={`absolute inset-0 left-1/2 top-1/2 -translate-1/2 transition-all duration-350 ${isSaved? "scale-100" : "scale-0"}`}/>
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-white md:w-1/2 w-full">
                                <ul className="flex flex-wrap gap-4 mb-4">
                                    <li className="shrink-0 ml-[2px]">{item.seasons.length} {item.seasons.length>1? "Seasons" : "Season"}</li>
                                    {item.genres.map((genre, key) => (
                                        <li key={key} className="text-white shrink-0 relative after:absolute after:w-[4px] after:h-[4px] after:bg-[rgba(200,200,200,0.8)] after:rounded-full after:top-[55%] after:-translate-y-1/2 after:-left-[11px]">{genre.name}</li>
                                    ))}
                                </ul>
        
                                <p>{item.overview}</p>

                                <ul className="flex flex-wrap gap-2 my-4">
                                    <li className="font-[500]">First Release Date: </li>
                                    <li className="text-white/70 font-[500]">{item.first_air_date.split("-")[0]}</li> 
                                </ul>
                            </div>
                        </div>
        
                        {/* Seasons */}
                        <div className="text-white mt-15 mb-10">
                            <div className="overflow-hidden pr-5" ref={emblaRef}>
                                <div className="flex">
                                    {item.seasons.map((season, key) => (
                                        <button className={`min-w-[140px] px-7 py-3 border-b shrink-0 ${key == selectedPart? "border-white" : "border-transparent"}`} key={key} onClick={() => setSelectedPart(key)}>{season.name}</button>
                                    ))}
                                </div>
                            </div>
        
                            <Episodes season={item.seasons[selectedPart].season_number} episodes={item.seasons[selectedPart].episode_count} />
                        </div>
        
                        {/* Similar */}
                        <Section title="Customers also watched" items={[]} type={0}/>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default WatchTv;