import Banner from "./Banner";
import { NavLink } from "react-router-dom";

const Home = () => {


    return (
        <>
        <div>
            <Banner></Banner>
        </div>
        <div className="w-full lg:px-60 mt-2">
        <h3 className="text-4xl md:text-5xl font-semibold">
        Embark on a Flavorful Adventure
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6">
        Delight in authentic flavors that evoke memories of home-cooked meals and cherished family recipes. Discover a culinary journey rooted in tradition and crafted with love.
        </p>
        </div>
        <div className="my-2">
        <h3 className="text-4xl md:text-5xl text-emerald-500 font-semibold">
        Top Food Selection
        </h3>
        </div>
        <div>
        <NavLink to="/all-foods" className="bg-indigo-500 text-white font-medium py-2 px-4 w-[160px] btn rounded transition-all hover:bg-indigo-600 active:scale-95">
          All Foods
        </NavLink>
        </div>
        </>
    );
};

export default Home;