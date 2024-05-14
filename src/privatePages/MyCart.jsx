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
    const [page, setPage] = useState(1);
    const limit = 6;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = ` https://restaurant-server-theta.vercel.app/carts?email=${user.email}&page=${page}&limit=${limit}`;
                const res = await axios.get(url, { withCredentials: true });
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

        if (user?.email) {
            fetchData();
        }
    }, [page, user, navigate]);

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const isLastPage = carts.length < limit;

    return (
        <>
            <div className="my-4">
                <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">My Purchased List</h2>
            </div>
            {
                loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) :
                    (<div className="grid mt-6 lg:grid-cols-3 gap-4">
                        {
                            carts.map(cart => <MyCartCard key={cart._id} cart={cart} carts={carts} setCarts={setCarts}></MyCartCard>)
                        }
                    </div>)
            }
            <div className="my-4">
            <div className="join">
                    <button className="join-item btn" disabled={page === 1}  onClick={prevPage}>
                        «
                    </button>
                    <button className="join-item btn">
                        Page {page}
                    </button>
                    <button className="join-item btn" disabled={isLastPage} onClick={nextPage}>
                        »
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyCart;