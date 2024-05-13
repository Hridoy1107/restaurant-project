import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import GalleryCard from './GalleryCard';
import PropTypes from 'prop-types';

const GalleryCards = ({ gallery, setGallery }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 8;

    const fetchGallery = () => {
        setLoading(true);
        const url = `http://localhost:5000/gallery?page=${page}&limit=${limit}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setGallery(data);
                } else {
                    navigate('/');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGallery();
    }, [page, navigate, setGallery]);

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const isLastPage = gallery.length < limit;

    return (
        <>
            {
                loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) :
                    (
                        <div className="grid lg:grid-cols-4 gap-4 lg:px-0 px-4">
                            {
                                gallery.map(review => <GalleryCard key={review._id} review={review}></GalleryCard>)
                            }
                        </div>
                    )
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

GalleryCards.propTypes = {
    gallery: PropTypes.array.isRequired,
    setGallery: PropTypes.array.isRequired
};

export default GalleryCards;