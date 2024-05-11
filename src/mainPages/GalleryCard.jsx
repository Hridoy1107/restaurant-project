import PropTypes from 'prop-types';

const GalleryCard = ({ review }) => {

    const { name, url, feedback } = review

    return (
        <>
            <div>
                <div className="hero rounded-xl h-[300px] w-[330px]" style={{
                    backgroundImage: `url(${url})`
                }}>
                    <div className="hero-content text-center text-neutral-content opacity-0 hover:opacity-100">
                        <div className="max-w-md rounded-xl bg-slate-50 bg-opacity-60">
                            <p className="my-1 font-medium text-xl text-black">{feedback}</p>
                            <h1 className="text-black text-3xl font-bold">Review given by: <span className="text-violet-600">{name}</span></h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

GalleryCard.propTypes = {
    review: PropTypes.array.isRequired
};

export default GalleryCard;