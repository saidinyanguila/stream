import Nav from "../components/Nav";
import Banner from "../components/Banner";
import ContinueWatching from "../components/ContinueWatching";
import Section from "../components/Section";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";
import { GetPopularMovies, GetPopularTV } from "../services/API";

const Index = () => {
    const [movies, setMovies] = useState<[]>([]);
    const [tvShows, setTvShows] = useState<[]>([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await GetPopularMovies();
                setMovies(popularMovies);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load popular movies...");
            }
            finally {
                setLoading(false);
            }

        };

        const loadPopularTvShows = async () => {
            try {
                const popularTvShows = await GetPopularTV();
                setTvShows(popularTvShows);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load popular tv shows...");
                console.log(error);
            }
            finally {
                setLoading(false);
            }

        };

        loadPopularMovies();
        loadPopularTvShows();
    }, []);

    return (
        <div className="relative bg-[rgb(15,15,15)]">
            <div className={`absolute inset-0 bg-black z-9999 ${!loading && "hidden"}`}></div>

            <Nav title="Home"/>

            <div className="max-w-[1440px] mx-auto">
                <Banner items={movies} />
                <ContinueWatching />
                <div className="px-4">
                    <Section title="Popular Movies" items={movies} type={0}/>
                    <Section title="Popular TV Shows" items={tvShows} type={1}/>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;