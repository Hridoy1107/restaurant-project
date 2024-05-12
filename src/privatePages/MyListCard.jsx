import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2";

const MyListCard = ({ food, foods, setFoods }) => {

    const { _id, dishName, url, category, price, quantity } = food

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/foods/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Place has been deleted.',
                                'success'
                            )
                            const remaining = foods.filter(food2 => food2._id !== _id);
                            setFoods(remaining);
                        }
                    })

            }
        })
    }

    return (
        <>
            <div>
                <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <img className="object-cover w-full h-60" src={url} />
                    <div className="p-6">
                        <div>
                            <span className={`text-xs font-medium ${category === 'Appetizers' &&
                                'text-blue-500 '
                                } ${category === 'Main Course' &&
                                'text-emerald-500 '
                                } ${category === 'Desserts' &&
                                'text-red-500 '
                                }  `}>{category}</span>
                            <h1 className="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">{dishName}</h1>
                        </div>
                        <div className="mt-4">
                            <div className="lg:flex lg:justify-between lg:items-center">
                                <div>
                                    <h1 className="mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Price: $ <span className="text-yellow-400">{price}</span></h1>
                                </div>
                                <div>
                                {quantity === 0 ? (
                                    <h1 className="mx-2 text-xl font-semibold text-red-500 dark:text-gray-200">Out of Stock</h1>
                                ) : (
                                    <h1 className="mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Quantity: <span className="text-green-600 dark:text-gray-300">{quantity}</span></h1>
                                )}
                                </div>
                            </div>
                            <div className="lg:flex lg:justify-around">
                                <NavLink to={`/edit/${_id}`} className="bg-yellow-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-yellow-600 active:scale-95">Edit</NavLink>
                                <a onClick={() => handleDelete(_id)} className="bg-red-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-red-600 active:scale-95">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

MyListCard.propTypes = {
    food: PropTypes.array.isRequired,
    foods: PropTypes.array.isRequired,
    setFoods: PropTypes.array.isRequired
};

export default MyListCard;