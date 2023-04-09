import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, className, children, onClick }) => {
    const router = useRouter();
    const isActive = router.asPath === href;

    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        }
        router.push(href);
    };

    return (
        <button
            className={`${className} ${isActive ? "active-link" : ""}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default NavLink;
