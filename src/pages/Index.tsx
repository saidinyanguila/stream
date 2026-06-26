import Nav from "../components/Nav";
import Banner from "../components/Banner";
import ContinueWatching from "../components/ContinueWatching";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Index = () => {

    return (
        <div className="relative bg-[rgb(15,15,15)]">
            <Nav title="Home"/>
            
            <div className="max-w-[1440px] mx-auto">
                <Banner />
                <ContinueWatching />
                <div className="px-4">
                    <Section title="Recently Updated" />
                    <Section title="Recomended for you" />

                    <Section title="Popular Movies" />
                    <Section title="Popular TV Shows" />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Index;