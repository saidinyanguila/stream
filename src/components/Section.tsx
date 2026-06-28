import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import TvCard from "./TvCard";
import MovieCard from "./MovieCard";

type SectionProps = {
    title: string;
    type: number;
    items: [];
};


const Section = ({ title, type, items }: SectionProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
    });
   
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
   
    const updateButtons = useCallback(() => {
        if (!emblaApi) return

        setCanPrev(emblaApi.canScrollPrev())
        setCanNext(emblaApi.canScrollNext())
    }, [emblaApi])
   
    useEffect(() => {
        if (!emblaApi) return

        updateButtons() // initial state

        emblaApi.on("select", updateButtons)
        emblaApi.on("reInit", updateButtons)

        return () => {
            emblaApi.off("select", updateButtons)
            emblaApi.off("reInit", updateButtons)
        }
    }, [emblaApi, updateButtons])

    return (
        <div className="px-0 py-6">
            <div className="flex items-center justify-between text-white mb-8">
                <h2 className="md:text-3xl font-bold text-xl">{title}</h2>

                <div className="md:flex hidden items-center gap-5">
                    <button onClick={scrollPrev} aria-label="Previous brands"className={`${canPrev? "opacity-100 events-all" : "opacity-0 events-none"} rounded-full w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors`}>
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={scrollNext} aria-label="Next brands" className={`${canNext? "opacity-100 events-all" : "opacity-0 events-none"} rounded-full  w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors`}>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="overflow-x-hidden" ref={emblaRef}>
                <div className="md:flex grid grid-flow-col gap-x-3">
                    {items.map(item => type == 0? <MovieCard item={item}/> : <TvCard item={item}/>)}
                </div>
            </div>
        </div>
    )
}

export default Section;

