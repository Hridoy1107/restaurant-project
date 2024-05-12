import { useLoaderData, useParams, Link } from "react-router-dom";
import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";
import { useContext, useEffect} from "react";
import { FiArrowRight } from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";
import Swal from 'sweetalert2';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const SingleFoodPage = () => {

    const { user } = useContext(AuthContext);
    const foods = useLoaderData();
    const { id } = useParams();
    const food = foods.find(food => food._id === id);


    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    const userMail = user.email
    const disableLink = food.quantity === 0 || userMail === food.email;
    const handleClickDisabledLink = () => {
        Swal.fire({
            title: 'Warning!',
            text: 'This item is either out of stock or belongs to you!',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        return;
    };

    return (
        <>
            <div className="mt-5 lg:mx-40">
                <motion.section
                    style={{
                        backgroundImage,
                    }}
                    className="relative grid rounded-xl place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
                >
                    <div className="my-2">
                        <img className="lg:mx-40 lg:h-60 rounded-xl" src={food.url} alt="" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-4xl md:leading-tight">
                            {food.dishName}
                        </h1>
                    </div>
                    <div className="lg:flex my-2 justify-between">
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight my-2">
                            Category: <span className={`font-medium ${food.category === 'Appetizers' &&
                                'text-blue-500 '
                                } ${food.category === 'Main Course' &&
                                'text-emerald-500 '
                                } ${food.category === 'Desserts' &&
                                'text-red-500 '
                                }  `}>{food.category}</span>
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Price: $ <span className="text-yellow-400">{food.price}</span>
                        </h1>
                    </div>
                    <div className="lg:flex my-2 justify-between">
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight my-2">
                            Made by: <span>{food.userName}</span>
                        </h1>
                        <h1 className=" bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Food Origin: <span >{food.country}</span>
                        </h1>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
                            {food.description}
                        </p>
                        <h1 className=" bg-gradient-to-br mb-4 from-white to-gray-400 bg-clip-text text-center text-xl font-medium leading-tight text-transparent md:text-xl md:leading-tight">
                            Food Quantity: <span>{food.quantity === 0 ? 'Out of Stock' : food.quantity}</span>
                        </h1>
                        {disableLink ? (
                            <motion.button
                                style={{
                                    border,
                                    boxShadow,
                                }}
                                whileHover={{
                                    scale: 1.015,
                                }}
                                whileTap={{
                                    scale: 0.985,
                                }}
                                className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                                onClick={handleClickDisabledLink}
                            >
                                Purchase
                                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                            </motion.button>
                        ) : (
                            <Link to={`/purchase-page/${id}`} >
                                <motion.button
                                    style={{
                                        border,
                                        boxShadow,
                                    }}
                                    whileHover={{
                                        scale: 1.015,
                                    }}
                                    whileTap={{
                                        scale: 0.985,
                                    }}
                                    className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
                                >
                                    Purchase
                                    <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </motion.section>
            </div>
        </>
    );
};

export default SingleFoodPage;