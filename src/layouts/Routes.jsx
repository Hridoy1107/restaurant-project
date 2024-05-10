import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "../mainPages/ErrorPage";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <h1 className="text-slate-500 font-bold">hi to home</h1>,
            },
        ]
    },
]);

export default Routes;