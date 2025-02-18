import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../mainPages/ErrorPage";
import Home from "../mainPages/Home";
import Login from "../mainPages/Login";
import Register from "../mainPages/Register";
import Gallery from "../mainPages/Gallery";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../privatePages/AddFood";
import AllFoods from "../mainPages/AllFoods";
import SingleFoodPage from "../mainPages/SingleFoodPage";
import PurchasePage from "../privatePages/PurchasePage";
import MyCart from "../privatePages/MyCart";
import MyList from "../privatePages/MyList";
import Edit from "../privatePages/Edit";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/all-foods',
                element: <AllFoods></AllFoods>,
            },
            {
                path: '/gallery',
                element: <Gallery></Gallery>,
            },
            {
                path: '/add-food',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
            },
            {
                path: "/details/:id",
                element: <PrivateRoute><SingleFoodPage></SingleFoodPage></PrivateRoute>,
                loader: () => fetch(' https://restaurant-server-theta.vercel.app/foods'),
            },
            {
                path: '/purchase-page/:id',
                element: <PrivateRoute><PurchasePage></PurchasePage></PrivateRoute>,
                loader: () => fetch(' https://restaurant-server-theta.vercel.app/foods'),
            },
            {
                path: "/my-cart",
                element: <PrivateRoute><MyCart></MyCart></PrivateRoute>,
            },
            {
                path: "/my-list",
                element: <PrivateRoute><MyList></MyList></PrivateRoute>,
            },
            {
                path: "/edit/:id",
                element: <PrivateRoute><Edit></Edit></PrivateRoute>,
                loader: ({ params }) => fetch(` https://restaurant-server-theta.vercel.app/foods/${params.id}`),
            },
        ]
    },
]);

export default Routes;