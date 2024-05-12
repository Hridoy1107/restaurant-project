import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

const Edit = () => {

    const { user } = useContext(AuthContext);
    const foods = useLoaderData();
    const { _id, dishName, url, quantity, price, country, description  } = foods


    const handleEdit = event => {
        event.preventDefault();

        const form = event.target;

        const dishName = form.dishName.value;
        const url = form.url.value;
        const category = form.category.value;
        const quantity = parseFloat(form.quantity.value);
        const price = parseFloat(form.price.value);
        const country = form.country.value;
        const userName = form.userName.value;
        const email = form.email.value;
        const description = form.description.value;

        const editedFoods = { dishName, url, category, quantity, price, country, userName, email, description  }

        console.log(editedFoods);

        fetch(`http://localhost:5000/foods/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedFoods)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Dish Edited Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }

    return (
        <>
            <div className="bg-slate-100 py-12 lg:px-24 px-2 mt-10 rounded-2xl">
                <h2 className="mb-6 text-3xl font-bold text-teal-700">Edit Your Dish</h2>
                <p className="font-medium mb-2 mx-2 text-black">Expand Your Culinary Horizons. Add a Dish to Our Menu and Share Your Delicious Creations with the World!</p>
                <form onSubmit={handleEdit}>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="dishName"
                                defaultValue={dishName}
                                    placeholder="Dish Name"
                                    className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Image</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="url" 
                                defaultValue={url} placeholder="Photo Url" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Category</span>
                            </label>
                            <select
                                name="category"
                                className="border p-2 rounded-md"
                            >
                                <option value="Appetizers">Appetizers</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="quantity" 
                                defaultValue={quantity} placeholder="Food Quantity" className="input input-bordered w-full " />
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
                                    placeholder="Price" defaultValue={price}
                                    className="input input-bordered w-full " />
                            </label>
                        </div>
                        <div className="form-control lg:w-1/2 lg:ml-4">
                            <label className="label">
                                <span className="label-text font-medium text-black">Food Origin</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="country" placeholder="Country Name" defaultValue={country} className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="lg:flex mb-2">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text font-medium text-black">User Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" defaultValue={user?.displayName} name="userName"
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
                    <label className="font-medium text-black">
                        Description
                    </label>
                    <textarea
                        className="block w-full px-4 py-2 mt-2 border rounded-md"
                        type="text" name="description" placeholder="Description" defaultValue={description}
                    ></textarea>
                    <input type="submit" value="Edit Dish" className="btn btn-primary btn-block mt-4" />
                </form>
            </div>
        </>
    );
};

export default Edit;