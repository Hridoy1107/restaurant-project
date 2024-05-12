import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import TopFoodsCard from "./TopFoodsCard";

const TopFoods = () => {

    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    const url = 'http://localhost:5000/foods?top=true';
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
    }, [url, navigate]);

    return (
        <>
            <div className="grid mt-6 lg:grid-cols-3 gap-4 lg:px-0 px-4">
                {
                    foods.map(food => <TopFoodsCard key={food._id} food={food}></TopFoodsCard>)
                }
            </div>
        </>
    );
};

export default TopFoods;