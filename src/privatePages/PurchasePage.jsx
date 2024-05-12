import { AuthContext } from "../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const PurchasePage = () => {

    const { user } = useContext(AuthContext);

    const [foods, setFoods] = useState(useLoaderData());
    const { id } = useParams();
    const food = foods.find(food => food._id === id);

    const [maxQuantity, setMaxQuantity] = useState(food.quantity);
    useEffect(() => {
        setMaxQuantity(food?.quantity);
    }, [food.quantity]);

    const minimum = 0;

    const handleAddCart = event => {
        event.preventDefault();

        const form = event.target;

        const url = food.url;
        const userName = food.userName;
        const email1 = food.email;
        const dishName = form.dishName.value;
        const quantity = parseFloat(form.quantity.value);
        const price = parseFloat(form.price.value);
        const buyerName = form.buyerName.value;
        const email = form.email.value;
        const date = form.date.value;
        const foodId = food._id;

        if (quantity > maxQuantity) {
            Swal.fire({
                title: 'Warning!',
                text: 'Quantity exceeds available quantity',
                icon: 'error',
                confirmButtonText: 'Okay'
              });
            return;
        }
        if (quantity <= minimum) {
            Swal.fire({
                title: 'Warning!',
                text: 'Select a real number',
                icon: 'error',
                confirmButtonText: 'Okay'
              });
            return;
        }

        if (quantity === 0) {
            Swal.fire({
                title: 'Warning!',
                text: 'This item is out of stock',
                icon: 'error',
                confirmButtonText: 'Okay'
              });
              return;
        } 
        if (email1 === user.email) {
            Swal.fire({
                title: 'Warning!',
                text: 'You can not purchase your own dish',
                icon: 'error',
                confirmButtonText: 'Okay'
              });
              return;
        }

        const newCarts = { dishName, url, userName, quantity, price, buyerName, email, date, foodId }

        console.log(newCarts);

        fetch('http://localhost:5000/carts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCarts)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added to Cart Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                      const updatedFoods = foods.map(item => {
                        if (item._id === foodId) {
                            return { ...item, quantity: item.quantity - quantity };
                        }
                        return item;
                    });
                    setFoods(updatedFoods);
                }
            })
    }

    return (
        <> 
        <div className="bg-slate-100 py-12 lg:px-24 px-2 mt-10 rounded-2xl">
        <h2 className="text-3xl lg:text-4xl mb-4 text-center font-semibold text-cyan-700">Purchase your favorite meal</h2>
        <form onSubmit={handleAddCart}>
                <div className="lg:flex mb-2">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text font-medium text-black">Food Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="dishName"
                                defaultValue={food.dishName} 
                                readOnly={true}
                                className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2 lg:ml-4">
                        <label className="label">
                            <span className="label-text font-medium text-black">Food Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="price" defaultValue={food?.price} 
                                readOnly={true} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <div className="lg:flex mb-2">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text font-medium text-black">Food Quantity ({food.quantity === 0 ? 'Out of Stock' : food.quantity}) </span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="quantity" placeholder="Quantity" className="input input-bordered w-full " max={maxQuantity} />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2 lg:ml-4">
                        <label className="label">
                            <span className="label-text font-medium text-black">Buying Date</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="date" defaultValue={new Date().toLocaleDateString('en-GB')} readOnly={true} className="input input-bordered w-full " />
                        </label>
                    </div>
                </div>
                <div className="lg:flex mb-2">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text font-medium text-black">Buyer Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="buyerName" defaultValue={user?.displayName} 
                                    readOnly={true}
                                className="input input-bordered w-full " />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2 lg:ml-4">
                        <label className="label">
                            <span className="label-text font-medium text-black">Buyer Email</span>
                        </label>
                        <label className="input-group">
                            <input type="text" defaultValue={user?.email} name="email"
                                    readOnly={true}  className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add to Cart" className="btn btn-primary btn-block mt-4" disabled={food.quantity === 0} />
            </form>
        </div>
            
        </>
    );
};

export default PurchasePage;