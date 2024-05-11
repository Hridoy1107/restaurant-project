import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

const AddFood = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="bg-slate-100 py-12 lg:px-24 px-2 mt-10 rounded-2xl">
                <h2 className="mb-6 text-3xl font-bold text-teal-700">Add a Dish</h2>
                <p className="font-medium mb-2 mx-2 text-black">Expand Your Culinary Horizons. Add a Dish to Our Menu and Share Your Delicious Creations with the World!</p>
                <form >
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="dishName"
                                    placeholder="Dish Name"
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="url" placeholder="Photo Url" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Category</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="category"
                                    placeholder="Category"
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="quantity" placeholder="Food Quantity" className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Price</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="price"
                                    placeholder="Price"
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Origin</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="country" placeholder="Country Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">User Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={user?.displayName} name="name"
                                    readOnly={true}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">User Email</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={user?.email} name="email"
                                    readOnly={true} className="input input-bordered w-full " />
                            </label>
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-black">Details</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="details" placeholder="Place Details" className="input input-bordered w-full h-[100px]" />
                            </label>
                        </div>
                    </div>
                    <input type="submit" value="Add Place" className="btn btn-primary btn-block" />
                </form>
            </div>
        </>
    );
};

export default AddFood;