import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer"

const results = Object.values(
    import.meta.glob('@/assets/covers/*.{jpg,jpeg,png,webp}', { eager: true })
).map((mod: any) => mod.default);

const Search = () => {
    const [activeTypeFilter, setActiveTypeFilter] = useState(0);
    const typeFilters = [
        {"value": 0, "title": "All"},
        {"value": 1, "title": "Movies"},
        {"value": 2, "title": "TV Shows"},
    ];

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    return (
        <div className="relative bg-[rgb(15,15,15)]">
            <Nav title="Search"/>

            <div className="max-w-[1440px] mx-auto">
                <div className="px-4 py-8 gap-2">
                    {/* Filters */}
                    <div className="grid grid-cols-3 max-w-100 gap-2 mb-6 mx-auto">
                        {typeFilters.map((filter, key) => (
                            <button onClick={() => setActiveTypeFilter(filter.value)} key={key} className={`${activeTypeFilter == filter.value? "bg-white text-black" : "bg-white/20 text-black/90"} text-center text-[15px] font-bold py-2 rounded-md cursor-pointer transition-all duration-200`}>{filter.title}</button>
                        ))}
                    </div>

                    {/* Search Results */}
                    <div className="w-full">
                        <p className="text-white text-2xl font-[600] mb-4">Results for "{query}"</p>

                        <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-4">
                            {results.map((res, key) => (
                                <a href="/stream/watch/item_id" key={key} className="">
                                    <div className="relative shrink-0 md:min-w-[100px] rounded-md overflow-hidden cursor-pointer">
                                        <div className="bg-red-200 relative w-full aspect-[7/10] rounded-md overflow-hidden">
                                            <img className="w-full h-full" src={res} alt="Cover"/>
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
            </div>

            <Footer />
        </div>
    )
}

export default Search;