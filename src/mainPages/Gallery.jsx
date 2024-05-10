

const Gallery = () => {
    return (
        <>
            <div className="mt-6">
                <div className="hero h-[400px]" style={{
                    backgroundImage: 'url(https://i.ibb.co/HHM6q18/R-6.jpg'}}>
                <div className="hero-overlay bg-opacity-60"><h1 className="mt-5 text-white text-4xl font-bold">Welcome to Gallery</h1></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md mt-5 rounded-xl bg-slate-50 bg-opacity-30">
                        <h1 className="mb-5 text-white text-4xl font-bold">Visual Delights Await</h1>
                        <p className="mb-5 font-medium text-xl text-white">Browse through our gallery and discover the artistry behind each culinary masterpiece. Let your eyes feast before your taste buds indulge.</p>
                    </div>
                </div>
            </div>
        </div >
        </>
    );
};

export default Gallery;