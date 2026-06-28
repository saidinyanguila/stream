import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchMovie, SearchTv } from "../services/API";

import Nav from "../components/Nav";
import Footer from "../components/Footer"

import MovieCard from "../components/MovieCard";
import TvCard from "../components/TvCard";


const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [movieResults, setMovieResults] = useState<[]>([]);
    const [tvResults, setTvResults] = useState<[]>([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadSearch = async () => {
            try {
                const q = query?.trim() ?? "";

                const m_res = await SearchMovie(q);
                const tv_res = await SearchTv(q);

                setMovieResults(m_res);
                setTvResults(tv_res);
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

        loadSearch();
    }, []);

    const [activeTypeFilter, setActiveTypeFilter] = useState(0);
    const typeFilters = [
        {"value": 0, "title": "Movies"},
        {"value": 1, "title": "TV Shows"},
    ];

    return (
        <div className="relative bg-[rgb(15,15,15)]">
            <div className={`absolute inset-0 bg-black z-9999 ${!loading && "hidden"}`}></div>
            
            <Nav title="Search"/>

            <div className="max-w-[1440px] mx-auto">
                <div className="px-4 py-8">
                    {/* Filters */}
                    <div className="grid grid-cols-2 max-w-100 gap-2 mb-6 mx-auto">
                        {typeFilters.map((filter, key) => (
                            <button onClick={() => setActiveTypeFilter(filter.value)} key={key} className={`${activeTypeFilter == filter.value? "bg-white text-black" : "bg-white/20 text-black/90"} text-center text-[15px] font-bold py-2 rounded-md cursor-pointer transition-all duration-200`}>{filter.title}</button>
                        ))}
                    </div>

                    {/* Search Results */}
                    <div className="w-full">
                        <p className="text-white text-2xl font-[600] mb-4">Results for "{query}"</p>

                        <div className="md:flex md:flex-wrap md:gap-x-2 md:gap-y-4 grid grid-cols-2 gap-x-2 gap-y-4">
                            {activeTypeFilter == 0 ? 
                                movieResults.map(movie => <MovieCard item={movie}/>)
                            :
                                tvResults.map(tv => <TvCard item={tv}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Search;