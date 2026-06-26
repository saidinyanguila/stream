import Nav from "../components/Nav";
import Section from "../components/Section";
import Footer from "../components/Footer";

type CatProps = {
  title: string;
};

const Category = ({ title }: CatProps) => {

    return (
        <div className="relative mx-auto min-h-[200vh] max-w-[1440px] bg-[rgb(15,15,15)]">
            <Nav title={title}/>

            <div className="max-w-[1440px] mx-auto">
                <div className="md:hidden block text-center text-white py-5">
                    <p className="text-xl font-bold">{title}</p>
                </div>

                <div className="px-4">
                    <Section title={`Popular ${title}`}/>
                    <Section title="Because you watched..."/>
                    <Section title="[Genre]"/>
                    <Section title="Hot"/>
                    <Section title="From your watchlist"/>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Category;