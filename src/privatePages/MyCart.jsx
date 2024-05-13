import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import MyCartCard from './MyCartCard';
import axios from 'axios';

const MyCart = () => {

    const { user } = useContext(AuthContext);
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const url = `http://localhost:5000/carts?email=${user?.email}`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url, {withCredentials: true});
                if (res.status === 200) {
                    setCarts(res.data);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url, navigate]);

    return (
        <>
            <div className="my-4">
                <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">My Purchased List</h2>
            </div>
            {
                loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) :
                    (<div className="grid mt-6 lg:grid-cols-3 gap-4 lg:px-0 px-4">
                        {
                            carts.map(cart => <MyCartCard key={cart._id} cart={cart} carts={carts} setCarts={setCarts}></MyCartCard>)
                        }
                    </div>)
            }

        </>
    );
};

export default MyCart;