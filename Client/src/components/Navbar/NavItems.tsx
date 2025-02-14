import {Link, useLocation} from "react-router-dom";
import {Navigation} from "./Navbar.tsx";

interface NavItemsProps {
    navigationItems: Navigation[];
}

/**
 * NavItems Component
 *
 * The NavItems component displays the navigation links in the Navbar.
 *
 * @example
 * ```tsx
 * <NavItems navigationItems={navigation}/>
 * ```
 *
 * @param {NavItemsProps} props - The props of the component.
 * @returns {JSX.Element} - The rendered NavItems component.
 */
const NavItems = (props: NavItemsProps) => {
    const location = useLocation()

    return (
        <ul className="menu menu-horizontal px-1">
            {props.navigationItems.map((item, index) => (
                <li key={index}>
                    <Link
                        to={{
                            pathname: `${item.href}`
                        }}
                        aria-current={(location.pathname===item.href) ? "page" : undefined}
                    >
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavItems;