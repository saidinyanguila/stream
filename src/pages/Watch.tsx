import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Plus, Check } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import Episodes from "../components/Episodes";
import Section from "../components/Section";

import _banner from "../assets/images/02_banner.jpg";

const item = {
    "id" : 0,
    "title" : "Title",
    "description" : "Description - Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias, voluptatum dolorem rem commodi nemo adipisci, perferendis, impedit odit cumque voluptatibus modi distinctio saepe et velit eum necessitatibus? Inventore quaerat dolorum eaque laboriosam eligendi repudiandae.",
    "genres" : ["Genre 1", "Genre 2", "Genren 3"],
    "cast" : ["Actor 1", "Actor 2", "Actor 3", "Actor 4"],
    "release" : "Year",
    "type": 1,

    "parts" : [
        {"id": 0, "title" : "Season 1", "episodes" : 10},
        {"id": 1, "title" : "Season 2", "episodes" : 10},
        {"id": 2, "title" : "Season 3", "episodes" : 10},
        {"id": 3, "title" : "Season 4", "episodes" : 10},
    ],

    "images" : {
        "cover" : "",
        "banner" : _banner
    }
}

const Watch = () => {
    const { id } = useParams();

    const [selectedPart, setSelectedPart] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
    });
    
    return (
        <div className="relative mx-auto min-h-[200vh] max-w-[1440px] bg-[rgb(15,15,15)]">
            <Nav title="Watch" />
        
            <section className="relative">
                <div className="relative md:h-[550px] overflow-hidden">
                    {/* <img className="h-full w-full object-center object-cover" src={item.images.banner} alt="" /> */}
                    <div className="absolute inset-0 z-99 watch-banner-filter"></div>
                </div>
    
                <div className="md:bg-[rgb(0,0,0)] px-4 py-4 md:px-[8%] md:py-10 z-99">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-2 justify-between items-center mb-10">
                        <div className="md:w-1/2 w-full">
                            <p className="text-3xl text-white font-[500] mb-4">{item.title}</p>
    
                            <div className="md:w-3/4 w-full flex gap-2">
                                <a href={`#${id}`} className="grow-1 flex items-center justify-center gap-4 bg-white text-lg text-center py-3 font-bold rounded-md">
                                    <Play fill="[black]"/> Play {item.type == 0? "" : item.parts[selectedPart].title}
                                </a>
    
                                <button className="relative block bg-white text-lg text-center px-7 py-3 aspect-square shrink-0 font-bold rounded-md cursor-pointer" onClick={() => setIsSaved(!isSaved)}>
                                    <Plus size={28} strokeWidth={3} className={`absolute inset-0 left-1/2 top-1/2 -translate-1/2 transition-all duration-350 ${isSaved? "scale-0" : "scale-100"}`}/>
                                    <Check size={28} strokeWidth={3} className={`absolute inset-0 left-1/2 top-1/2 -translate-1/2 transition-all duration-350 ${isSaved? "scale-100" : "scale-0"}`}/>
                                </button>
                            </div>
                        </div>
    
                        <div className="text-white md:w-1/2 w-full">
                            <ul className="flex gap-4 mb-3">
                                <li>{item.release}</li>
                                {item.type == 1? <li className="shrink-0 ml-[2px] relative after:absolute after:w-[4px] after:h-[4px] after:bg-[rgba(200,200,200,0.8)] after:rounded-full after:top-[55%] after:-translate-y-1/2 after:-left-[11px]">{item.parts.length} {item.parts.length>1? "Seasons" : "Season"}</li> : ""}
                                {item.genres.map((genre, key) => (
                                    <li key={key} className="text-white relative after:absolute after:w-[4px] after:h-[4px] after:bg-[rgba(200,200,200,0.8)] after:rounded-full after:top-[55%] after:-translate-y-1/2 after:-left-[11px]">{genre}</li>
                                ))}
                            </ul>
    
                            <p>{item.description}</p>
    
                            <ul className="flex flex-wrap gap-2 my-4">
                                <li className="font-[500]">Cast: </li>
    
                                {item.cast.length == 0? 
                                    <li className="text-gray-600 italic font-[500]">Cast info unavailable</li> 
                                : 
                                    item.cast.map((actor, key) => (
                                        <li key={key} className="shrink-0 text-white/70"><a href="/">{actor}{key == item.cast.length-1 ? "" : ","}</a></li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                    </div>
    
                    {item.type == 0? "" : 
                    <div className="text-white mt-15 mb-10">
                        <div className="overflow-hidden pr-5" ref={emblaRef}>
                            <div className="flex">
                                {item.parts.map((part, key) => (
                                    <button className={`min-w-[140px] px-7 py-3 border-b shrink-0 ${part.id == selectedPart? "border-white" : "border-transparent"}`} key={key} onClick={() => setSelectedPart(part.id)}>{part.title}</button>
                                ))}
                            </div>
                        </div>
    
                        <Episodes />
                    </div>
                    }
    
                    <Section title="Customers also watched" />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Watch;