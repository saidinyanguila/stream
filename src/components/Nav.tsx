import { useState } from "react";
import { Search, Grid3X3, User2, Menu, X } from "lucide-react";

type NavProps = {
  title: string;
};

const Nav = ({ title }: NavProps) => {
    const navItems = [
        {
            "name" : "Home",
            "href" : "/stream"
        },
        {
            "name" : "Movies",
            "href" : "/stream/movies"
        },
        {
            "name" : "TV Shows",
            "href" : "/stream/tv"
        }
    ];

    // 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsOpen(false);
    }

    const toggleNav = () => {
        setIsSearchOpen(false);
        setIsOpen(!isOpen);
    }

    const genres = [
        {"id": 0, "title" : "Action"},
        {"id": 1, "title" : "Adventure"},
        {"id": 2, "title" : "Animation"},
        {"id": 3, "title" : "Anime"},
        {"id": 4, "title" : "Biography"},
        {"id": 5, "title" : "Comedy"},
        {"id": 6, "title" : "Crime"},
        {"id": 7, "title" : "Documentary"},
        {"id": 8, "title" : "Drama"},
        {"id": 9, "title" : "Family"},
        {"id": 10, "title" : "Fantasy"},
        {"id": 11, "title" : "Historical"},
        {"id": 12, "title" : "Horror"},
        {"id": 13, "title" : "Kids"},
        {"id": 14, "title" : "Music"},
        {"id": 15, "title" : "Musical"},
        {"id": 16, "title" : "Mystery"},
        {"id": 17, "title" : "Romance"},
        {"id": 18, "title" : "Sci-Fi"},
        {"id": 19, "title" : "Sport"},
        {"id": 20, "title" : "Superhero"},
        {"id": 21, "title" : "Thriller"},
        {"id": 22, "title" : "War"}
    ];

    return (
        <div className="relative">
            <div className="bg-[rgba(0,0,0,0.75)] backdrop-blur-lg relative w-full top-0 left-0 flex items-center justify-between px-3 py-2 md:px-8 md:py-4 text-white z-99">            
                <div className="flex items-center gap-4 md:gap-8">
                    <button className="md:hidden p-3 rounded-full cursor-pointer active:bg-[rgba(100,100,100,0.5)]" onClick={() => toggleNav()}>
                        {isOpen? <X /> : <Menu />}
                    </button>

                    <a href="/stream" className="text-2xl">Stream</a>

                    <nav className="hidden md:flex items-center gap-5 mt-1">
                        {navItems.map((item, key) => (
                            <a href={item.href} key={key} className={item.name == title? "relative transition-all duration-500 after:absolute after:w-full after:h-[3px] after:bg-white after:left-0 after:-bottom-2 after:rounded-tl-full after:rounded-tr-full before:absolute before:w-full before:h-[3px] before:bg-white before:left-0 before:-bottom-2 before:rounded-tl-full before:rounded-tr-full before:blur-xs" : ""}>{item.name}</a>
                        ))}
                    </nav>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                    <form action="/stream/search/" className="relative">
                        <input name="q" type="text" className="bg-[rgba(50,50,50,0.5)] min-w-100 pl-12 pr-7 py-2 rounded-full focus:outline-1 focus:outline-[rgba(200,200,200,0.5)]" placeholder="Search for a Movie or TV Show" autoComplete="off" required/>
                        <Search size={20} className="absolute top-1/2 left-4 -translate-y-1/2"/>
                    </form>

                    <button className="p-2 rounded-full cursor-pointer hover:bg-[rgba(100,100,100,0.5)]"><Grid3X3 /></button>

                    {isLoggedIn? 
                    <button className="hover:bg-[rgba(100,100,100,0.5)] px-4 py-2 flex gap-2 items-center text-[15px] rounded-full cursor-pointer" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                        <User2 size={20}/>
                        user
                    </button>
                    :
                    <button className="hover:bg-[rgba(100,100,100,0.5)] px-4 py-2 text-[15px] rounded-full cursor-pointer" onClick={() => setIsLoggedIn(!isLoggedIn)}>Sign In</button>
                    }
                </div>

                <div className="md:hidden flex gap-2">
                    <button className="p-3 rounded-full cursor-pointer active:bg-[rgba(100,100,100,0.5)]" onClick={() => toggleSearch()}>
                        {isSearchOpen? <X /> : <Search />}
                    </button>

                    <button className="p-3 rounded-full cursor-pointer active:bg-[rgba(100,100,100,0.5)]" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                        {isLoggedIn? <User2 /> : "Sign In"}
                    </button>
                </div>
            </div>

            {isOpen && 
                <div className="block md:hidden absolute left-0 top-full w-full bg-[rgb(20,20,20)] border-b-2 border-white px-6 py-3 z-999 transition-all duration-500">
                    <ul className="text-white py-2 flex flex-col gap-4 mb-4">
                        {navItems.map((item, key) => (
                            <li key={key}><a className={`relative text-[17px] ${item.name == title && "font-bold"}`} href={item.href}>{item.name}</a></li>
                        ))}
                    </ul>

                    <div className="border-t border-white text-white text-xl py-6">
                        <p className="mb-5">Genres :</p>

                        <div className="grid grid-cols-2 gap-2">
                            {genres.map((genre, key) => (
                                <a key={key} href="/" className="text-[15px] font-[500] text-gray-300 mb-[2px]">{genre.title}</a>
                            ))} 
                        </div>
                    </div>
                </div>
            }

            {isSearchOpen && 
                <form action="/stream/search" className="block md:hidden absolute left-0 top-full w-full bg-[rgb(20,20,20)] px-2 py-3 z-999 transition-all duration-500">
                    <div className="relative text-white">
                        <input name="q" type="text" className="bg-[rgba(50,50,50,0.5)] w-full pl-12 pr-7 py-2 rounded-full focus:outline-1 focus:outline-[rgba(200,200,200,0.5)]" placeholder="Search for a Movie or TV Show" autoComplete="off" required/>
                        <Search size={20} className="absolute top-1/2 left-4 -translate-y-1/2"/>
                    </div>
                </form>
            }
        </div>
    )
}

export default Nav;