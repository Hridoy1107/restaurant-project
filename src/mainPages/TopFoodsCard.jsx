import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopFoodsCard = ({ food }) => {

    const { dishName, url, category, price, quantity, _id, purchaseCount } = food

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
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
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
                            <div>
                                <h1 className="mx-2 text-xl font-semibold text-gray-700 dark:text-gray-200">Sold: <span className="text-cyan-600 dark:text-gray-300">{purchaseCount}</span></h1>
                                <Link to={`/details/${_id}`} className="bg-emerald-500 text-white font-medium py-2 px-4 w-[160px] mt-2 btn rounded transition-all hover:bg-emerald-600 active:scale-95">Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
TopFoodsCard.propTypes = {
    food: PropTypes.array.isRequired
};

export default TopFoodsCard;