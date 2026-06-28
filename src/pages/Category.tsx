import Nav from "../components/Nav";
import Section from "../components/Section";
import Footer from "../components/Footer";

import { useState, useEffect } from "react";
import { GetPopularMovies, GetPopularTV } from "../services/API";

type CatProps = {
  title: string;
};

const Category = ({ title }: CatProps) => {
    const [items, setItems] = useState<[]>([]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await GetPopularMovies();
                setItems(popularMovies);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load popular movies...");
                console.log(error);
            }
            finally {
                setLoading(false);
            }

        };

        const loadPopularTvShows = async () => {
            try {
                const popularTvShows = await GetPopularTV();
                setItems(popularTvShows);
            }
            catch (err) {
                console.log(err);
                setError("Failed to load popular tv shows...");
            }
            finally {
                setLoading(false);
            }

        };

        if (title == "Movies") loadPopularMovies();
        else if (title == "TV Shows") loadPopularTvShows();
    }, []);
    
    return (
        <div className="relative mx-auto min-h-[200vh] max-w-[1440px] bg-[rgb(15,15,15)]">
            <div className={`absolute inset-0 bg-black z-9999 ${!loading && "hidden"}`}></div>

            <Nav title={title}/>

            <div className="max-w-[1440px] mx-auto">
                <div className="md:hidden block text-center text-white py-5">
                    <p className="text-xl font-bold">{title}</p>
                </div>

                <div className="px-4">
                    <Section title={`Popular ${title}`} items={items} type={title == "Movies"? 0 : 1}/>
                    <Section title="Recently Updated" items={items} type={title == "Movies"? 0 : 1}/>
                    <Section title="From your watchlist" items={items} type={title == "Movies"? 0 : 1}/>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Category;