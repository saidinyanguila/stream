import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ContinueWatching = () => {
    const items = [50, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
        <div className="px-4 py-8 text-white">
            <div className="flex items-center justify-between mb-8">
                <h2 className="md:text-3xl font-bold text-xl">Continue Watching</h2>

                <div className="md:flex hidden items-center gap-5">
                    <button onClick={scrollPrev} aria-label="Previous brands"className={`${canPrev? "opacity-100 events-all" : "opacity-0 events-none"} rounded-full w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors`}>
                        <ArrowLeft size={18} />
                    </button>
                    <button onClick={scrollNext} aria-label="Next brands" className={`${canNext? "opacity-100 events-all" : "opacity-0 events-none"} rounded-full  w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors`}>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="md:flex grid grid-flow-col gap-x-4">
                    {items.map((item, key) => (
                        <div key={key} className="shrink-0 item w-[50vw] md:w-[25%] bg-[rgba(100,100,100,0.1)] rounded-lg cursor-pointer">
                            <div className="relative w-full aspect-video rounded-lg">
                                {/* Progress Bar */}
                                <div className="absolute left-0 bottom-0 w-full h-1 bg-[rgba(100,100,100,0.1)]">
                                    <div className={`absolute w-[55%] ${item} h-full bg-white rounded-full`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            
            </div>
        </div>
    )
}

export default ContinueWatching;