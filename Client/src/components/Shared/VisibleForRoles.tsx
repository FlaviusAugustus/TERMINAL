import {ReactNode} from "react";
import {useUserRoles} from "@hooks/useUserRoles.ts";
import {Role} from "@api/models/Role.ts";

export interface VisibleForRoleProps {
    roles: Array<Role>,
    children: ReactNode
}

const VisibleForRoles = (props: VisibleForRoleProps) => {
    const userRole = useUserRoles();

    if(userRole && !props.roles.includes(userRole)){
        return <></>;
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default VisibleForRoles;