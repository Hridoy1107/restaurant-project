import img from '../assets/icon.png';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {

    const [theme, setTheme] = useState('light')

    const handleToggle = e => {
        if (e.target.checked) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')

        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You have to log in again!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log out!'
        }).then((result) => {
            if (result.isConfirmed)
                logOut()
                    .then(() => console.log('user logged out successfully'),
                        Swal.fire({
                            title: 'Success!',
                            text: 'User Log Out Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        }))
                    .catch(error => console.error(error))
        })

    }

    const linksCenter = <>
        <NavLink to="/" 
        style={({ isActive }) => {
            return {
                background: isActive ? "none" : " ",
                border: isActive ? "solid" : " ",
            };
        }}
        className=" btn btn-info w-[148px] h-[48px]"><span className=" text-lg">Home</span></NavLink>
        <NavLink to="/all-foods"
        style={({ isActive }) => {
            return {
                background: isActive ? "none" : " ",
                border: isActive ? "solid" : " ",
            };
        }} 
        className=" btn btn-info w-[148px] h-[48px]"><span className=" text-lg">All Foods</span></NavLink>
        <NavLink to="/gallery"
        style={({ isActive }) => {
            return {
                background: isActive ? "none" : " ",
                border: isActive ? "solid" : " ",
            };
        }} 
        className=" btn btn-info w-[148px] h-[48px]"><span className=" text-lg ">Gallery</span></NavLink>

    </>
    const linksEnd = <>
        <NavLink to="/login" 
        style={({ isActive }) => {
            return {
                background: isActive ? "none" : " ",
                border: isActive ? "solid" : " ",
            };
        }} 
        className=" btn btn-accent w-[148px] h-[48px]"><span className=" text-lg ">Login</span></NavLink>
        <NavLink to="/register" 
        style={({ isActive }) => {
            return {
                background: isActive ? "none" : " ",
                border: isActive ? "solid" : " ",
            };
        }} 
        className=" btn btn-accent w-[148px] h-[48px]"><span className=" text-lg ">Register</span></NavLink>
    </>

    return (
        <>
            <div className="bg-emerald-500 rounded-xl">
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box gap-y-2 w-[164px]">
                                {linksCenter}
                                {user ?
                                <></> : <>{linksEnd}</>
                                }
                            </ul>
                        </div>
                        <img className="lg:h-[48px] lg:w-[48px] h-[36px] w-[36px] mr-2" src={img} alt="" />
                        <h1 className="lg:text-4xl hidden lg:flex text-red-600 font-medium">Foodie Zone</h1>
                    </div>
                    <div className="navbar-center">
                        <div className="hidden lg:flex gap-4">{linksCenter}</div>
                        <div><h1 className="lg:hidden text-red-600 font-medium">Foodie Zone</h1></div>
                    </div>
                    <div className="navbar-end gap-4">
                        {
                            user ?
                                <>
                                    <div className="mr-3 avatar tooltip tooltip-hover" >
                                    </div>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn tooltip tooltip-hover btn-ghost btn-circle" data-tip={user.displayName}>
                                            <img className="rounded-full h-full w-full" src={user.photoURL} />
                                        </div>
                                        <div>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 gap-y-1 shadow bg-base-100 rounded-box w-[135px]">
                                                <li><a onClick={handleLogOut} className="btn w-[120px] h-[48px] bg-[red] hover:bg-[red] text-[#FFFFFF]">Log out</a></li>
                                                <li><NavLink to="/my-list" className="btn btn-info w-[120px] h-[48px] text-[#FFFFFF]">My List</NavLink></li>
                                                <li><NavLink to="/add-food" className="btn btn-warning w-[120px] h-[48px] text-[#FFFFFF]">Add Food</NavLink></li>
                                                <li><NavLink to="/my-cart" className="btn btn-primary w-[120px] h-[48px] text-[#FFFFFF]">My Cart</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="hidden lg:flex gap-4">{linksEnd}</div>
                                </>
                        }
                        <label className="swap w-8 h-8 lg:w-10 lg:h-10 swap-rotate">
                            <input type="checkbox" onChange={handleToggle} className="theme-controller" />
                            <img className="swap-off fill-current w-8 h-8 lg:w-10 lg:h-10" src={sun} alt="" />
                            <img className="swap-on fill-current w-8 h-8 lg:w-10 lg:h-10" src={moon} alt="" />
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;