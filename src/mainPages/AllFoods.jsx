import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import AllFoodsCard from './AllFoodsCard';

const AllFoods = () => {

    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = 'http://localhost:5000/foods';
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
    }, [navigate]);

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
            <div>
                
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