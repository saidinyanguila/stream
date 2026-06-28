import { useState, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"

import _banner from "../assets/banners/00_banner.jpg";

type BannerItem = {
    backdrop_path: string;
    title: string;
    release_date: string;
    genre_ids: number[];
    overview: string;
};

type BannerItemProps = {
    items: BannerItem[];
};

const Banner = ({ items } : BannerItemProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    
    const autoplay = useRef(
        Autoplay({ delay: 60000, stopOnInteraction: false })
    )

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            dragFree: false,
        }, 
        [autoplay.current]
    );

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList())

        const onSelect = () => { setSelectedIndex(emblaApi.selectedScrollSnap()) }

        emblaApi.on("select", onSelect)
        onSelect()
    }, [emblaApi])

    return (
        <section className="relative w-full p-2 md:px-4 md:py-2">
            <div className="relative md:max-h-[550px] rounded-2xl overflow-hidden" ref={emblaRef}>
                <div className="flex items-center">
                {items.map((item, key) => (
                    <div key={key} className="relative min-w-full">
                        <img src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`} alt={item.title} className="md:w-full md:h-full object-cover shrink-0 transition-colors duration-300 whitespace-nowrap"/>                                 
                        
                        <div className="absolute z-99 inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_25%,rgba(0,0,0,0.35)_50%,black_100%)]"></div>
                        
                        <div className="absolute text-white px-1 top-[50%] left-3 md:-translate-y-1/2 md:left-10 md:top-1/2">
                            <p className="text-2xl md:text-4xl font-[600] mb-2 md:mb-4">{item.title}</p>

                            <ul className="flex gap-4 md:my-3">
                                <li>{item.release_date.split("-")[0]}</li>
                                {item.genre_ids.map((genre, key) => (
                                    <li key={key} className="text-[rgba(200,200,200,0.8)] relative after:absolute after:w-[4px] after:h-[4px] after:bg-[rgba(200,200,200,0.8)] after:rounded-full after:top-[55%] after:-translate-y-1/2 after:-left-[11px]">{genre}</li>
                                ))}
                            </ul>

                            <p className="md:block hidden text-[18px] text-[rgb(200,200,200)] max-w-[700px]">{item.overview}</p>
                        </div>
                    </div>
                ))}
                </div>

                <div className="absolute z-99 md:left-[50%] right-[15px] bottom-[15px] md:-translate-x-1/2 z-1 flex justify-center items-end gap-4 mt-4">
                    {scrollSnaps.map((_btn, index) => (
                        <button key={index} className={`w-3 h-3 rounded-full cursor-pointer transitionn-all duration-300 ${index == selectedIndex ? "bg-white" : "bg-gray-400"}`}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Banner;