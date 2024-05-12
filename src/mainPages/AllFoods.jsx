import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import AllFoodsCard from './AllFoodsCard';
import { FaSearch } from "react-icons/fa";

const AllFoods = () => {

    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const url = `http://localhost:5000/foods?searchTerm=${searchTerm}`;
    useEffect(() => {
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setFoods(data)
                }
                else {
                    navigate('/');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate, url]);

    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('search');
        setSearchTerm(searchValue);
    };

    const handleReset = () => {
        setSearchTerm('');
    };

    return (
        <>
            <div className="mt-6">
                <div className="hero h-[400px]" style={{
                    backgroundImage: 'url(https://i.ibb.co/4KTgcsQ/beef-bar-paris-interiors-13-low-resolution-1.jpg)'
                }}>
                    <div className="hero-overlay bg-opacity-60"><h1 className="mt-5 text-black text-4xl font-bold">Our Complete Menu</h1></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md mt-5 rounded-xl bg-slate-50 bg-opacity-40">
                            <h1 className="mb-5 text-black text-4xl font-bold">Discover Our Culinary Delights</h1>
                            <p className="mb-5 font-medium text-xl text-black">Explore the flavors, ingredients, and passion that make dining at our restaurant an unforgettable experience. Bon appétit!</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:px-60 mt-2">
                    <p className="text-base md:text-lg my-4">
                        Discover a tantalizing array of dishes meticulously crafted to delight your senses. From appetizers to desserts, dive into a world of flavors and let your taste buds embark on a memorable journey with us. Our all foods page is your gateway to an unforgettable dining experience.
                    </p>
                    <h1 className="text-4xl font-semibold">Explore Our Delicious Menu Selections</h1>
                </div>
            </div>
            <div className="my-4 lg:px-20">
                <form onSubmit={handleSearch}>
                    <label className="lg:mx-80 mx-4 input input-bordered flex items-center gap-2">
                        <input type="text" className="grow"
                        name="search" placeholder="Search a Dish" />
                        <button className="btn btn-ghost h-12 w-28"><FaSearch /></button>
                    </label>
                </form>
                <div className="my-2">
                <button onClick={handleReset} className="btn btn-warning h-12 w-28">Reset</button>
                </div>
            </div>
            {
                loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) :
                    (
                        <div className="grid mt-6 lg:grid-cols-3 gap-4 lg:px-0 px-4">
                            {
                                foods.map(food => <AllFoodsCard key={food._id} food={food}></AllFoodsCard>)
                            }
                        </div>
                    )
            }

        </>
    );
};


export default AllFoods;