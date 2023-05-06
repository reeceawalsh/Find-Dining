import { useRouter } from "next/router";

// this component is a navigation link for the navbar
const NavLink = ({ href, className, children, onClick }) => {
    const router = useRouter();
    const isActive = router.asPath === href;

    // handles being clicked on and runs the onClick if there is one.
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
