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
                element: <SingleFoodPage></SingleFoodPage>,
                loader: () => fetch('http://localhost:5000/foods'),
            },
        ]
    },
]);

export default Routes;