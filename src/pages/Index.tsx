import Nav from "../components/Nav";
import Banner from "../components/Banner";
import ContinueWatching from "../components/ContinueWatching";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Index = () => {

    return (
        <div className="relative mx-auto min-h-[200vh] max-w-[1440px] bg-[rgb(15,15,15)]">
            <Nav title="Home"/>
            <Banner />
            <ContinueWatching />
            <div className="px-4">
                <Section title="Recently Updated" />
                <Section title="Recomended for you" />

                <Section title="Popular Movies" />
                <Section title="Because you watched ..." />

                <Section title="Popular TV Shows" />
                <Section title="More [Genre]" />
            </div>
            <Footer />
        </div>
    );
};

export default Index;