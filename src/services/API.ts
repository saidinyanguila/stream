const API_KEY = "f6d5a5bb95a701cde58bdf38e5e3ffcc";
const BASE_URL = "https://api.themoviedb.org/3";

export const GetPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();

    return data.results;
}

export const GetPopularTV = async () => {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();

    return data.results;
}

export const SearchMovie = async (query : string) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.results;
}

export const SearchTv = async (query : string) => {
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.results;
}

export const GetMovie = async (id : string) => {
    const response = await fetch(`${BASE_URL}/movie/${encodeURIComponent(id)}?api_key=${API_KEY}`);
    const data = await response.json();

    return data;
}

export const GetTvShow = async (id : string) => {
    const response = await fetch(`${BASE_URL}/tv/${encodeURIComponent(id)}?api_key=${API_KEY}`);
    const data = await response.json();

    return data;
}