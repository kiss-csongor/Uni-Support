import { isLoggedInNavigation, isLoggedOutNavigation } from "../constants";
import { useLocation, Link } from "react-router-dom";
import Button from './Button';
import MenuSvg from '../assets/svg/MenuSvg'
import { HamburgerMenu } from './design/Header'
import { useState, useEffect } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import sze_fekvo_logo from '../assets/own/sze_fekvo_logo.png'
import '../css/Header.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import 'boxicons'
import SuccesAlert from './SuccesAlert'
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
    const csrfToken = Cookies.get("csrftoken")

    const [succes, setSucces] = useState("");
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const pathname = useLocation();
    const navigate = useNavigate();
    const { status , logout } = useAuth();
    const [openNavigation, setOpenNavigation] = useState(false);

    const toggleNavigation = () => {
        if (openNavigation) {
            setOpenNavigation(false);
            enablePageScroll();
        } else {
            setOpenNavigation(true);
            disablePageScroll();
        }
    };

    const handleClick = () => {
        if (!openNavigation) return;

        enablePageScroll();
        setOpenNavigation(false);
    };

    const handleLogout = async () => {
        enablePageScroll();
        setOpenNavigation(false);

        try {
            await axios.post(
                // "http://localhost:8000/api/logout/"
                "http://uni-support.sytes.net/api/logout/"
                , {}, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log("Sikeresen kijelentkezett.");
            navigate("/")
        } catch (err) {
            console.error("Hiba történt a kijelentkezés során", err);
        }

        setSucces("Sikeresen kijelentkezett.");
        await sleep(3000);
        logout();
    }

  return (
    <div>
        <div className={`w-full fixed top-0 z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${openNavigation ? 'bg-n-8': 'bg-n-8/90 backdrop-blur-sm'}`}>
            <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-1">
                <div className='block w-[12rem] xl'>
                    <Link to="/"><img src={sze_fekvo_logo} width={190} height={40} alt='SzE_logo' /></Link>
                </div>
                <nav className={`${openNavigation ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
                    <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
                    {status === "in" && (
                        <>
                            {isLoggedInNavigation.map((item) => (
                                <Link to={item.url} onClick={item.title === "Kijelentkezés" ? handleLogout : handleClick} key={item.id} className={` block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.pathname ? 'z-2 lg:text-n-1 link-line-active' : 'lg:text-n-1/50'} lg:leading-5 lg:hover:text-n-1 xl:px-15 link-line`}>
                                    {item.title}
                                </Link>
                            ))}
                        </>
                    )}
                    {status === "out" && (
                        <>
                            {isLoggedOutNavigation.map((item) => (
                                <Link to={item.url} onClick={handleClick} key={item.id} className={` block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${item.onlyMobile ? "lg:hidden" : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${item.url === pathname.pathname ? 'z-2 lg:text-n-1 link-line-active' : 'lg:text-n-1/50'} lg:leading-5 lg:hover:text-n-1 xl:px-15 link-line`}>
                                    {item.title}
                                </Link>
                            ))}
                        </>
                    )}
                    </div>
                    <HamburgerMenu />
                </nav>
                {status === "out" && (
                    <>
                        <div className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">
                            <Link to="/signup">Regisztráció</Link>
                        </div>
                        <Link to="/signin">
                            <Button className="hidden lg:flex">
                                Bejelentkezés
                            </Button>
                        </Link>
                    </>
                )}
                {status === "in" && (
                    <>
                        <Button className="hidden lg:flex" onClick={handleLogout}>
                            Kijelentkezés
                        </Button>
                    </>
                    
                )}


                <Button onClick={toggleNavigation} className="ml-auto lg:hidden" px="px-3">
                    <MenuSvg openNavigation={openNavigation} />
                </Button>
            </div> 
            
        </div>
        {succes && <SuccesAlert message={succes} setSucces={setSucces} />}
    </div>
    
)
}

export default Header;