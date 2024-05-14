import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import MyListCard from './MyListCard';

const MyList = () => {

    const { user } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const url = ` https://restaurant-server-theta.vercel.app/foods?email=${user?.email}`;
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
    }, [url, navigate]);

    return (
        <>
            <div className="my-4">
                <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">My Added List</h2>
            </div>
            {
                loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    <div className="grid mt-6 lg:grid-cols-3 gap-4 lg:px-0 px-4">
                {
                    foods.map(food => <MyListCard key={food._id} food={food} foods={foods} setFoods={setFoods}></MyListCard>)
                }
            </div>
                )
            }
        </>
    );
};

export default MyList;