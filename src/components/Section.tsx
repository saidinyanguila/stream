import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionProps = {
  title: string;
};

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Section = ({ title }: SectionProps) => {
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
        <div className="px-0 py-8 text-white">
            <div className="flex items-center justify-between mb-8">
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
                <div className="md:flex grid grid-flow-col gap-x-2">
                    {items.map((item, key) => (
                        <a href={`/stream/watch/${item}`} key={key} className="section-item relative shrink-0 w-[33vw] md:w-[15%] aspect-[3/5] md:max-h-[265px] max-h-[190px] bg-[rgba(100,100,100,0.1)] rounded-lg cursor-pointer overflow-hidden">
                            <div className="section-item-header bg-[rgba(100,100,100,0.1)] hidden md:flex items-center justify-between absolute w-full left-0 px-2 pt-2 pb-1 transition-all duration-300 events-none">
                                <p className="text-[17px]">2026</p>
                                <p className="border border-white rounded-md text-[12px] font-bold px-1 px-2">{item > 6? "TV" : "Movie"}</p>
                            </div>

                            <div className="section-item-footer hidden md:block bg-[rgba(100,100,100,0.1)] absolute w-full left-0 px-2 pb-3 transition-all duration-300 events-none">
                                <p className="text-[19px]">Title {item}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Section;