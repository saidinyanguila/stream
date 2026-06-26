import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SectionProps = {
  title: string;
};

const items = Object.values(
    import.meta.glob('@/assets/covers/*.{jpg,jpeg,png,webp}', { eager: true })
).map((mod: any) => mod.default);


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
        <div className="px-0 py-7 text-white">
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
                        <a href="/stream/watch/item_id" key={key} className="">
                            <div className="relative shrink-0 md:w-[10%] md:min-w-[175px] min-w-[135px] rounded-md overflow-hidden cursor-pointer">
                                <div className="bg-red-200 relative w-full aspect-[7/10] rounded-md overflow-hidden">
                                    <img className="w-full h-full" src={item} alt="Cover"/>
                                </div>

                                <div className="text-center text-white/60 text-[15px] py-2">
                                    <p>Title</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Section;