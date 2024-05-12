import { Outlet } from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

const Root = () => {
    return (
        <>
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
        </>
    );
};

export default Root;