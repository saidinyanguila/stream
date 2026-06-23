import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";

const results = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        <div className="relative mx-auto min-h-[200vh] max-w-[1440px] bg-[rgb(15,15,15)]">
            <Nav title="Search"/>

            <div className="flex flex-col-reverse md:flex-row px-4 py-8 gap-2">
                {/* Search Results */}
                <div className="w-full">
                    <p className="text-white text-2xl font-[600] mb-4">Results for "{query}"</p>

                    <div className="md:flex flex-wrap grid grid-cols-2 md:grid-cols-5 gap-2">
                        {results.map((res, key) => (
                            <a href={`/stream/watch/${res}`} key={key} className="section-item text-white relative aspect-[3/5] md:min-w-[18%] bg-[rgba(100,100,100,0.1)] rounded-lg cursor-pointer overflow-hidden">
                                <div className="section-item-header bg-[rgba(100,100,100,0.1)] hidden md:flex items-center justify-between absolute w-full left-0 px-2 pt-2 pb-1 transition-all duration-300 events-none">
                                    <p className="text-[17px]">2026</p>
                                    <p className="border border-white rounded-md text-[12px] font-bold px-1 px-2">{res > 6? "TV" : "Movie"}</p>
                                </div>

                                <div className="section-item-footer hidden md:block bg-[rgba(100,100,100,0.1)] absolute w-full left-0 px-2 pb-3 transition-all duration-300 events-none">
                                    <p className="text-[19px]">Title {res}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="min-w-80">
                    <p className="md:block hidden text-white text-xl font-[600] mb-5">Filter {activeTypeFilter != 0 && "(active)"}</p>
        
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {typeFilters.map((filter, key) => (
                            <button onClick={() => setActiveTypeFilter(filter.value)} key={key} className={`${activeTypeFilter == filter.value? "bg-white text-black" : "bg-white/20 text-black/90"} text-center text-[15px] font-bold py-2 rounded-md cursor-pointer transition-all duration-200`}>{filter.title}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;