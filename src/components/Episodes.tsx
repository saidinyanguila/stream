import useEmblaCarousel from "embla-carousel-react";
import _banner from "../assets/banners/00_banner.jpg";

const eps = [
    {"title" : "Episode 1"},
    {"title" : "Episode 2"},
    {"title" : "Episode 3"},
    {"title" : "Episode 4"},
    {"title" : "Episode 5"},
    {"title" : "Episode 6"},
    {"title" : "Episode 7"},
    {"title" : "Episode 8"},
    {"title" : "Episode 9"},
    {"title" : "Episode 10"},
    {"title" : "Episode 11"},
    {"title" : "Episode 12"},
];

const Episodes = () => {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
    });

    return (
        <div className="py-8 text-white">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="md:hidden grid grid-flow-col gap-x-4">
                    {eps.map((ep, key) => (
                        <div key={key} className="shrink-0 item w-[50vw] md:w-[25%] aspect-[4/3] bg-[rgba(100,100,100,0.1)] rounded-lg cursor-pointer">
                            <div className="bg-[rgba(100,100,100,0.1)] relative w-full aspect-video rounded-lg">
                                {/* Progress Bar */}
                                <div className="absolute left-0 bottom-0 w-full h-1 bg-[rgba(100,100,100,0.1)]">
                                    <div className="absolute w-[65%] h-full bg-white rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1 py-2 md:my-2">
                                <p className="md:text-xl">{ep.title}</p>
                                <p className="text-sm md:mt-1 text-[rgba(200,200,200,0.85)]">1h left</p>
                            </div>
                        </div>
                    ))}
                </div>
            
            </div>

            <div className="md:grid hidden grid-cols-4 gap-x-2 gap-y-4">
                {eps.map((ep, key) => (
                    <div key={key} className="item w-full aspect-[4/3] bg-[rgba(100,100,100,0.1)] rounded-lg cursor-pointer">
                        <div className="bg-[rgba(100,100,100,0.1)] relative w-full aspect-video rounded-lg">
                            {/* Progress Bar */}
                            <div className="absolute left-0 bottom-0 w-full h-1 bg-[rgba(100,100,100,0.1)]">
                                <div className="absolute w-[65%] h-full bg-white rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-1 py-2 md:my-2">
                            <p className="md:text-xl">{ep.title}</p>
                            <p className="text-sm md:mt-1 text-[rgba(200,200,200,0.85)]">1h left</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Episodes;