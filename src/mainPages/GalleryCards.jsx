import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import GalleryCard from './GalleryCard';
import PropTypes from 'prop-types';

const GalleryCards = ({ gallery, setGallery }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const url = 'http://localhost:5000/gallery';
    useEffect(() => {
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setGallery(data)
                }
                else {
                    navigate('/');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate, setGallery]);

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
            {/* <div className="my-4">
                <div className="join">
                    <button className="join-item btn">«</button>
                    <button className="join-item btn">Page</button>
                    <button className="join-item btn">»</button>
                </div>
            </div> */}
        </>
    );
};

GalleryCards.propTypes = {
    gallery: PropTypes.array.isRequired,
    setGallery: PropTypes.array.isRequired
};

export default GalleryCards;