import { Disclosure} from '@headlessui/react'
import { CommandLineIcon} from '@heroicons/react/24/outline'
import {useState} from "react";
import NavMobileDropdown from "./NavMobileDropdown.tsx";
import NavItems from "./NavItems.tsx";
import UserProfileDropdown from "./UserProfileDropdown.tsx";
import UserAuthButtons from "./UserAuthButtons.tsx";

export interface Navigation {
    name: string;
    href: string;
}

const navigation: Navigation [] = [
    { name: 'Home',  href: '/'},
    { name: 'Add project', href: '/add-new-project' },
    { name: 'Test2', href: '/test2'},
    { name: 'Test3', href: '/tes3'},
]

/**
 * Navbar Component
 *
 * The Navbar component displays the navigation bar at the top of the page. It
 * includes the site logo, navigation links, and user profile information.
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 *
 * @returns {JSX.Element} - The rendered Navbar component
 */
const Navbar = () => {

    const [isAuth] = useState(true);

    return (
        <Disclosure as="nav" className="navbar bg-base-100">

            <div className="navbar-start">
                <CommandLineIcon className="h-10 w-10 hidden sm:block"/>
                <NavMobileDropdown navigationItems={navigation}/>
            </div>

            <div className="navbar-center hidden md:flex">
                <NavItems navigationItems={navigation}/>
            </div>

            <div className="navbar-end">
                {isAuth ?
                    (<UserProfileDropdown />)
                :
                    (<UserAuthButtons />)
                }
            </div>

        </Disclosure>
    )
};

export default Navbar;

