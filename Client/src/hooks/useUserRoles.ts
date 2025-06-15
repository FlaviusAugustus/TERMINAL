import useUserData from "./useUserData";
import {Role} from "@api/models/Role.ts";

export function useUserRoles(): Role|undefined {
    const { data } = useUserData();

    return data?.role as Role;
}
