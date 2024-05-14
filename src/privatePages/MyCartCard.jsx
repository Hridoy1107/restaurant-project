import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const MyCartCard = ({cart, carts, setCarts}) => {

    const { _id, dishName, url, category, price, quantity, userName, date} = cart

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


                fetch(` https://restaurant-server-theta.vercel.app/carts/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Dish has been deleted.',
                                'success'
                            )
                            const remaining = carts.filter(cart2 => cart2._id !== _id);
                            setCarts(remaining);
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
                                    <h1 className="lg:mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Purchased Quantity: <span className=" text-green-600 dark:text-gray-300">{quantity}</span></h1>
                                </div>
                            </div>
                            <div >
                                <div>
                                    <h1 className="mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Buying Date: <span>{date}</span></h1>
                                </div>
                                <div>
                                    <h1 className="mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Made By: <span className="text-red-600 dark:text-gray-300">{userName}</span></h1>
                                </div>
                            </div>
                            <div>
                                <a onClick={() => handleDelete(_id)} className="bg-red-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-red-600 active:scale-95">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

MyCartCard.propTypes = {
    cart: PropTypes.array.isRequired,
    carts: PropTypes.array.isRequired,
    setCarts: PropTypes.array.isRequired
};

export default MyCartCard;