import { useState, useEffect } from "react";
import { UserDetailsDto } from "@api/terminalSchemas.ts";
import { Input } from "@headlessui/react";
import { Button } from '@headlessui/react'

/**
 * Props for the UserDetails component.
 */
export interface UserDetailsProps {
    dataQuery: UserDetailsDto | undefined;
}

/**
 * UserDetails component displays and allows editing of user details such as email and role.
 *
 * @param {UserDetailsProps} props - The props for the component.
 * @param {UserDetailsDto | undefined} props.dataQuery - The user data to display and edit.
 *
 * @returns {JSX.Element} The rendered UserDetails component.
 */
const UserDetails = (props: UserDetailsProps) => {
    const [email, setEmail] = useState<string | undefined>(props.dataQuery?.email);
    const [role, setRole] = useState<string | undefined>(props.dataQuery?.role);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        const initialEmail = props.dataQuery?.email || "";
        const initialRole = props.dataQuery?.role || "";
        setIsChanged(email !== initialEmail || role !== initialRole);
    }, [email, role, props.dataQuery]);

    const handleReset = () => {
        setEmail(props.dataQuery?.email || "");
        setRole(props.dataQuery?.role || "");
    };

    const handleSubmit = () => {
        // Submit logic here
    };

    return (
        <div className="card-body">
            <div className="card-title text-4xl">User</div>
            <div className="divider"></div>
            <div className="grid grid-cols-[35%_65%] gap-y-3">
                <div className="font-bold">Email:</div>
                <b><div>{props.dataQuery?.email}</div></b>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mt-1">
                        Email*
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder={props.dataQuery?.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
                    />
                </div>
                <div></div>
                <div className="flex flex-col">
                    <label htmlFor="text" className="mt-1">
                        Role*
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-gray-200 px-3 py-2 rounded mt-2 text-gray-500"
                    >
                        <option value="Role">{props.dataQuery?.role}</option>
                        <option>Moderator</option>
                        <option>User</option>
                        <option>Guest</option>
                    </select>
                </div>
                <div></div>
                <div className="mt-6 flex gap-2">
                    <Button
                        className="btn btn-sm btn-soft rounded"
                        onClick={handleReset}
                        disabled={!isChanged}
                    >
                        Reset
                    </Button>
                    <Button
                        className="btn btn-sm btn-soft rounded"
                        onClick={handleSubmit}
                        disabled={!isChanged}
                    >
                        Submit changes
                    </Button>
                    <Button className="btn btn-sm btn-primary text-white rounded">Change password</Button>
                    <Button className="btn btn-sm btn-error text-white rounded">Delete</Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;