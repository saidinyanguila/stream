

const sharePlatforms = [
    {
        "name" : "Whatsapp",
        "url" : "/#",
        "svg" : "whatsapp"
    },
    {
        "name" : "Instagram",
        "url" : "/#",
        "svg" : "instagram"
    },
    {
        "name" : "Facebook",
        "url" : "/#",
        "svg" : "facebook"
    },
];

const Footer = () => {
    return (
        <div className=" px-4 py-10 md:px-12 md:py-18 border-t border-white mt-8">
            <div className="max-w-[1440px] mx-auto flex md:flex-row flex-col items-center gap-10">
                <div className="flex flex-col gap-4 text-white">
                    <a href="/stream" className="text-5xl font-bold">Stream</a>

                    <div className="flex justify-center gap-4">
                    {sharePlatforms.map((pl, i) => (
                        <a key={i} href={pl.url} className="block">
                            <img width={24} src={`https://cdn.simpleicons.org/${pl.svg}/white`} />
                        </a>
                    ))}
                    </div>
                </div>
                
                <div className="text-center text-white">
                    <p>Stream is a movies database with over 50,000 Movies and TV Shows, however, none of them are hosted on this site due to technical limitations. This site is meerly a demonstration of what can be achieved, given the right resources.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;