import { AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import GalleryCards from './GalleryCards'

const Gallery = () => {

    const { user } = useContext(AuthContext);

    const [gallery, setGallery] = useState([]);

    const handleAddGallery = event => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const url = form.url.value;
        const feedback = form.feedback.value;

        const newGallery = { name, url, feedback }

        console.log(newGallery);

        fetch('http://localhost:5000/gallery', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newGallery)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    setGallery([...gallery, newGallery]);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added to Gallery Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <>
            <div className="mt-6">
                <div className="hero h-[400px]" style={{
                    backgroundImage: 'url(https://i.ibb.co/HHM6q18/R-6.jpg)'
                }}>
                    <div className="hero-overlay bg-opacity-60"><h1 className="mt-5 text-white text-4xl font-bold">Welcome to Gallery</h1></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md mt-5 rounded-xl bg-slate-50 bg-opacity-30">
                            <h1 className="mb-5 text-white text-4xl font-bold">Visual Delights Await</h1>
                            <p className="mb-5 font-medium text-xl text-white">Browse through our gallery and discover the artistry behind each culinary masterpiece. Let your eyes feast before your taste buds indulge.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:px-60 mt-2">
                    <p className="text-base md:text-lg my-4">
                        Our gallery is a vibrant mosaic of flavors, textures, and presentations, each image telling a unique story of culinary craftsmanship and creativity. Explore our collection and let your imagination savor the richness of our culinary world.
                    </p>
                    <h1 className="text-4xl font-semibold">A Culinary Journey Awaits</h1>
                </div>
                <div className="mt-5">
                    <GalleryCards gallery={gallery} setGallery={setGallery}></GalleryCards>
                </div>
                <div className="mt-5">
                    {
                        user ? <>
                            <button className="btn btn-info" onClick={() => document.getElementById('my_modal_4').showModal()}>Add to Gallery</button>
                            <dialog id="my_modal_4" className="modal">
                                <div className="modal-box w-11/12 max-w-5xl">
                                    <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">Add Item</h2>
                                    <p className="font-medium mb-2 mx-2">Share Your Culinary Experience</p>
                                    <form onSubmit={handleAddGallery}>
                                        <div className="flex">
                                            <div className="form-control w-1/2">
                                                <label className="label">
                                                    <span className="label-text font-medium">Customer Name</span>
                                                </label>
                                                <label className="input-group">
                                                    <input type="text" defaultValue={user?.displayName} name="name"
                                                        readOnly={true}
                                                        className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                            <div className="form-control w-1/2 ml-4">
                                                <label className="label">
                                                    <span className="label-text font-medium">Food Image</span>
                                                </label>
                                                <label className="input-group">
                                                    <input type="text" name="url" placeholder="Photo Url" className="input input-bordered w-full" />
                                                </label>
                                            </div>
                                        </div>
                                        <label className="font-medium mt-2">
                                            Feedback
                                        </label>
                                        <textarea
                                            className="block w-full px-4 py-2 mt-2 bg-white text-black rounded-md"
                                            type="text" name="feedback" placeholder="Description"
                                        ></textarea>
                                        <input type="submit" value="Add to Gallery" className="btn w-1/2 my-2 btn-warning" />
                                    </form>
                                    <div>
                                        <form method="dialog">
                                            <button className="btn btn-error">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </> :
                            <>
                                <Link to="/login" className="btn btn-info" >Add to Gallery</Link>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Gallery;